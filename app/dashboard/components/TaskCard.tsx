"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, GripVertical } from "lucide-react";
import { Task } from "@/db/schema";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  isDragging?: boolean;
}

const priorityColors = {
  low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function TaskCard({ task, onEdit, onDelete, isDragging }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab active:cursor-grabbing bg-background shadow-sm hover:shadow-md transition-shadow",
        isDragging && "opacity-50 shadow-lg rotate-3"
      )}
      data-testid={`task-card-${task.id}`}
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1">
            <div
              {...attributes}
              {...listeners}
              className="mt-1 text-muted-foreground hover:text-foreground cursor-grab"
              data-testid={`task-drag-handle-${task.id}`}
            >
              <GripVertical className="h-4 w-4" />
            </div>
            <h3
              className="font-medium text-sm leading-tight flex-1"
              data-testid={`task-title-${task.id}`}
            >
              {task.title}
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -mr-2 -mt-1"
                data-testid={`task-menu-${task.id}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={onEdit}
                data-testid={`task-edit-${task.id}`}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="text-destructive focus:text-destructive"
                data-testid={`task-delete-${task.id}`}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {task.description && (
          <p
            className="text-xs text-muted-foreground mb-2 line-clamp-2"
            data-testid={`task-description-${task.id}`}
          >
            {task.description}
          </p>
        )}
        <Badge
          variant="secondary"
          className={cn("text-xs", priorityColors[task.priority ?? "medium"])}
          data-testid={`task-priority-${task.id}`}
        >
          {task.priority ?? "medium"}
        </Badge>
      </CardContent>
    </Card>
  );
}
