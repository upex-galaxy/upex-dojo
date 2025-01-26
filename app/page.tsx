import { ComponentCard } from "@/components/component-card"
import { Icons } from "@/components/icons"
import { HeroBanner } from "@/components/hero-banner"

const components = [
  { name: "Buttons", icon: Icons.button, href: "/components/input/buttons" },
  { name: "Text Fields", icon: Icons.textField, href: "/components/input/text-fields" },
  { name: "Dropdown Menus", icon: Icons.dropdown, href: "/components/input/dropdown-menus" },
  { name: "Checkboxes", icon: Icons.checkbox, href: "/components/input/checkboxes" },
  { name: "Radio Buttons", icon: Icons.radio, href: "/components/input/radio-buttons" },
  { name: "Sliders", icon: Icons.slider, href: "/components/input/sliders" },
  { name: "Modals", icon: Icons.modal, href: "/components/feedback/modals" },
  { name: "Tooltips", icon: Icons.tooltip, href: "/components/feedback/tooltips" },
  { name: "Tables", icon: Icons.table, href: "/components/data/tables" },
  { name: "Pagination", icon: Icons.pagination, href: "/components/navigation/pagination" },
  { name: "Navigation Menus", icon: Icons.menu, href: "/components/navigation/menus" },
  { name: "Multi-Select", icon: Icons.multiSelect, href: "/components/input/multi-select-dropdowns" },
  { name: "Autocomplete Fields", icon: Icons.autocomplete, href: "/components/input/autocomplete-fields" },
  { name: "Carousels", icon: Icons.carousel, href: "/components/media/carousels" },
  { name: "Dynamic Forms", icon: Icons.form, href: "/components/input/dynamic-forms" },
  { name: "Toggle Buttons", icon: Icons.toggle, href: "/components/input/toggle-buttons" },
  { name: "Accordions", icon: Icons.accordion, href: "/components/layout/accordions" },
  { name: "Progress Bars", icon: Icons.progress, href: "/components/feedback/progress-bars" },
  { name: "Toast Notifications", icon: Icons.toast, href: "/components/feedback/toast-notifications" },
  { name: "Drag-and-Drop", icon: Icons.dragDrop, href: "/components/interaction/drag-and-drop" },
  { name: "File Uploads", icon: Icons.upload, href: "/components/input/file-uploads" },
  { name: "File Downloads", icon: Icons.download, href: "/components/interaction/file-downloads" },
]

export default function Home() {
  return (
    <>
      <HeroBanner />
      <main className="flex-1 page-background">
        <div className="container max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component) => (
              <ComponentCard key={component.name} {...component} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

