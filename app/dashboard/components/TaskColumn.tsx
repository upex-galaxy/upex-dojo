"use client";

import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Task, TaskStatus } from "@/db/schema";
import { cn } from "@/lib/utils";

interface TaskColumnProps {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => Promise<void>;
}

export function TaskColumn({
  id,
  title,
  color,
  tasks,
  onEdit,
  onDelete,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-lg p-4 min-h-[400px] transition-colors",
        color,
        isOver && "ring-2 ring-primary ring-offset-2"
      )}
      data-testid={`column-${id}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg" data-testid={`column-title-${id}`}>
          {title}
        </h2>
        <span
          className="text-sm text-muted-foreground bg-background px-2 py-1 rounded"
          data-testid={`column-count-${id}`}
        >
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
        {tasks.length === 0 && (
          <p
            className="text-center text-muted-foreground py-8 text-sm"
            data-testid={`column-empty-${id}`}
          >
            No tasks
          </p>
        )}
      </div>
    </div>
  );
}
