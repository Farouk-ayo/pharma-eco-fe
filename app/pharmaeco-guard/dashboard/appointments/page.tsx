"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons";
import {
  useDorraAppointments,
  useDorraAppointment,
} from "@/lib/api/dorraQueries";
import {
  useDorraUpdateAppointment,
  useDorraDeleteAppointment,
} from "@/lib/api/dorraMutations";
import { Calendar, Pencil, Trash2, X, Clock, Plus } from "lucide-react";

interface AppointmentFormData {
  date: string;
  reason: string;
  status: "active" | "completed";
  summary?: string;
}

const AppointmentsPage = () => {
  const [editingAppointmentId, setEditingAppointmentId] = useState<
    number | null
  >(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const updateAppointmentMutation = useDorraUpdateAppointment();
  const deleteAppointmentMutation = useDorraDeleteAppointment();

  const { data: appointmentsData, isLoading } = useDorraAppointments();
  const { data: editingAppointment } = useDorraAppointment(
    editingAppointmentId!
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<AppointmentFormData>();

  React.useEffect(() => {
    if (editingAppointment && editingAppointmentId) {
      setValue("date", editingAppointment.date.split("T")[0]);
      setValue("reason", editingAppointment.reason || "");
      setValue("status", editingAppointment.status);
      setValue("summary", editingAppointment.summary || "");
    }
  }, [editingAppointment, editingAppointmentId, setValue]);

  const onSubmit = (data: AppointmentFormData) => {
    if (editingAppointmentId) {
      updateAppointmentMutation.mutate(
        { id: editingAppointmentId, data },
        {
          onSuccess: () => {
            reset();
            setEditingAppointmentId(null);
          },
        }
      );
    }
  };

  const handleEdit = (appointmentId: number) => {
    setEditingAppointmentId(appointmentId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingAppointmentId(null);
    reset();
  };

  const handleDeleteClick = (appointmentId: number) => {
    setAppointmentToDelete(appointmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (appointmentToDelete) {
      deleteAppointmentMutation.mutate(appointmentToDelete, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setAppointmentToDelete(null);
          if (editingAppointmentId === appointmentToDelete) {
            handleCancelEdit();
          }
        },
      });
    }
  };

  const todaysAppointments =
    appointmentsData?.results.filter(
      (apt) => apt.date.split("T")[0] === selectedDate
    ) || [];

  const confirmedCount = todaysAppointments.filter(
    (apt) => apt.status === "active"
  ).length;
  const completedCount = todaysAppointments.filter(
    (apt) => apt.status === "completed"
  ).length;

  return (
    <div className="p-4 lg:p-8 bg-primaryLight min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Appointments
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          Manage and track patient appointments
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Panel - Schedule */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 mb-6">
            <h3 className="text-base lg:text-lg font-bold text-primaryDark mb-4">
              Schedule
            </h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-4">
              Select date to view appointments
            </p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
              />
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">
                  Today&apos;s Appointments
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {todaysAppointments.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">
                  Active
                </span>
                <span className="text-sm font-bold text-green-600">
                  {confirmedCount}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-600">
                  Completed
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {completedCount}
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Plus className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Create New Appointment
                  </p>
                  <p className="text-xs text-blue-700">
                    Use the AI prompt box on the dashboard to create new
                    appointments. Example: &quot;Schedule appointment for
                    patient 123 on Dec 25 for follow-up&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {editingAppointmentId && editingAppointment && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h3 className="text-base lg:text-lg font-bold text-primaryDark">
                  Edit Appointment
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Date & Time
                  </label>
                  <input
                    {...register("date", { required: "Date is required" })}
                    type="datetime-local"
                    className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                  />
                  {errors.date && (
                    <span className="text-xs text-red-500 mt-1 block">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Reason
                  </label>
                  <input
                    {...register("reason")}
                    placeholder="Appointment reason"
                    className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full border px-4 py-2 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Summary
                  </label>
                  <textarea
                    {...register("summary")}
                    placeholder="Appointment summary"
                    rows={3}
                    className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none rounded-b-[30px] rounded-t-[8px]"
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="primary"
                    type="submit"
                    isDisabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancelEdit}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Panel - Appointments List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-bold text-primaryDark mb-2">
              Appointments for {new Date(selectedDate).toLocaleDateString()}
            </h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-6">
              {todaysAppointments.length} appointment(s) scheduled
            </p>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-gray-100 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            ) : todaysAppointments.length > 0 ? (
              <div className="space-y-4">
                {todaysAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`border-2 rounded-lg p-4 lg:p-5 transition-all cursor-pointer hover:shadow-md ${
                      appointment.status === "active"
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-200 bg-white"
                    } ${
                      editingAppointmentId === appointment.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleEdit(appointment.id)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            appointment.status === "active"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Calendar
                            className={`w-5 h-5 lg:w-6 lg:h-6 ${
                              appointment.status === "active"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm lg:text-base text-gray-900">
                            {appointment.patient_name}
                          </p>
                          <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 mt-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(appointment.date).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            appointment.status === "active"
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : "bg-green-100 text-green-700 border border-green-300"
                          }`}
                        >
                          {appointment.status === "active"
                            ? "Active"
                            : "Completed"}
                        </span>
                      </div>
                    </div>

                    {appointment.reason && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Reason:
                        </p>
                        <p className="text-sm text-gray-900">
                          {appointment.reason}
                        </p>
                      </div>
                    )}

                    {appointment.summary && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Summary:
                        </p>
                        <p className="text-sm text-gray-700">
                          {appointment.summary}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(appointment.id);
                        }}
                        className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(appointment.id);
                        }}
                        className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />
                </div>
                <p className="text-sm lg:text-base text-gray-500 mb-2">
                  No appointments scheduled for this date
                </p>
                <p className="text-xs text-gray-400">
                  Use AI prompt to create appointments
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Appointment
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this appointment?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setAppointmentToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteAppointmentMutation.isPending}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
              >
                {deleteAppointmentMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
