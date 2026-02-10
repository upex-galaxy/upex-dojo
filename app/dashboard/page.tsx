"use client";

import { useEffect, useState, useCallback } from "react";
import { TaskBoard } from "./components/TaskBoard";
import { TaskModal } from "./components/TaskModal";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Task, TaskStatus, TaskPriority } from "@/db/schema";

interface TaskMeta {
  count: number;
  maxAllowed: number;
  remaining: number;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<TaskMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
        setMeta(data.meta);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (data: {
    title: string;
    description?: string;
    priority: TaskPriority;
  }) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchTasks();
        setIsModalOpen(false);
      } else {
        const error = await response.json();
        alert(error.message || error.error);
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleUpdateTask = async (
    taskId: string,
    data: {
      title?: string;
      description?: string;
      priority?: TaskPriority;
      status?: TaskStatus;
    }
  ) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchTasks();
        setEditingTask(null);
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]" data-testid="loading-spinner">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="dashboard-title">
            My Tasks
          </h1>
          {meta && (
            <p className="text-muted-foreground" data-testid="task-count">
              {meta.count} / {meta.maxAllowed} tasks
            </p>
          )}
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={meta?.remaining === 0}
          data-testid="new-task-button"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <TaskBoard
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
      />

      <TaskModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateTask}
      />

      {editingTask && (
        <TaskModal
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
          task={editingTask}
          onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
        />
      )}
    </div>
  );
}
