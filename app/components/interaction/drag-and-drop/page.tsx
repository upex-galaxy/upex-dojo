"use client"

import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"

const SortableItem = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 bg-secondary rounded-md cursor-move"
    >
      {id}
    </div>
  )
}

const Container = ({ id, items }: { id: string; items: string[] }) => {
  const { setNodeRef } = useSortable({ id })

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className="p-4 bg-muted rounded-md min-h-[200px]">
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  )
}

const DraggableItem = ({ id }: { id: string }) => {
  return <div className="p-2 mb-2 bg-primary text-primary-foreground rounded-md cursor-move">{id}</div>
}

export default function DragAndDropPage() {
  const [items, setItems] = React.useState(["Item 1", "Item 2", "Item 3", "Item 4"])
  const [containers, setContainers] = React.useState({
    container1: ["Draggable 1", "Draggable 2"],
    container2: ["Draggable 3", "Draggable 4"],
  })
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event: any) => {
    const { active } = event
    setActiveId(active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleDragEndContainers = (event: any) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    if (active.id !== over.id) {
      setContainers((containers) => {
        const activeContainer = Object.keys(containers).find((key) =>
          containers[key as keyof typeof containers].includes(active.id),
        ) as keyof typeof containers | undefined

        const overContainer = Object.keys(containers).find(
          (key) => key === over.id || containers[key as keyof typeof containers].includes(over.id),
        ) as keyof typeof containers | undefined

        if (!activeContainer || !overContainer) {
          return containers
        }

        if (activeContainer !== overContainer) {
          return {
            ...containers,
            [activeContainer]: containers[activeContainer].filter((item) => item !== active.id),
            [overContainer]: [...containers[overContainer], active.id],
          }
        }

        const activeItems = containers[activeContainer]
        const oldIndex = activeItems.indexOf(active.id)
        const newIndex = activeItems.indexOf(over.id)

        return {
          ...containers,
          [activeContainer]: arrayMove(activeItems, oldIndex, newIndex),
        }
      })
    }
  }

  const resetContainers = () => {
    setContainers({
      container1: ["Draggable 1", "Draggable 2"],
      container2: ["Draggable 3", "Draggable 4"],
    })
  }

  return (
    <ComponentLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Drag and Drop</h1>

        <h2 className="text-2xl font-semibold mb-4">Sortable List</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((id) => (
                <SortableItem key={id} id={id} />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>{activeId ? <DraggableItem id={activeId} /> : null}</DragOverlay>
        </DndContext>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Drag Between Containers</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEndContainers}
          onDragStart={handleDragStart}
        >
          <div className="grid grid-cols-2 gap-4">
            <Container id="container1" items={containers.container1} />
            <Container id="container2" items={containers.container2} />
          </div>
          <DragOverlay>{activeId ? <DraggableItem id={activeId} /> : null}</DragOverlay>
        </DndContext>

        <Button onClick={resetContainers} className="mt-4">
          Reset Containers
        </Button>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Current State:</h2>
          <pre className="mt-2 p-4 bg-muted rounded-md overflow-auto">
            {JSON.stringify({ sortableList: items, containers }, null, 2)}
          </pre>
        </div>
      </div>
    </ComponentLayout>
  )
}

