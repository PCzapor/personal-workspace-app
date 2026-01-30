"use client"
import { Alert, Button, Card, TextInput } from "@/features/ui/custom"
import React from "react"

const MOCK_TASKS = [
  { id: 1, text: "Review notes", status: false },
  { id: 2, text: "Do 100000 pushups", status: false },
  { id: 3, text: "Get a new job", status: false },
]

const TasksChecklist = () => {
  const [tasks, setTasks] = React.useState(MOCK_TASKS)
  const [addTask, setAddTask] = React.useState("")
  const [status, setStatus] = React.useState<"error" | "success" | null>(null)

  const handleAddTask = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) {
      setStatus("error")
      setTimeout(() => {
        setStatus(null)
      }, 5000)
    }

    const newTask = { id: tasks.length + 1, text, status: false }
    setTasks((prev) => [...prev, newTask])
    if (!newTask) {
      setStatus("error")
    }
    setStatus("success")
    setAddTask("")
    setTimeout(() => setStatus(null), 5000)
  }

  const toggleTaskStatus = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: !t.status } : t)),
    )
  }

  return (
    <Card title="Today's tasks">
      <ul className='space-y-2 text-sm text-white/70'>
        {tasks.map((task) => (
          <li key={task.id} className='flex items-center justify-between'>
            <span>{task.text}</span>
            <label className='cursor-pointer select-none'>
              <input
                type='checkbox'
                checked={task.status}
                onChange={() => toggleTaskStatus(task.id)}
                className='sr-only'
              />

              <span
                className={[
                  "inline-flex h-7 w-7 items-center justify-center rounded-md",
                  "transition-all duration-150",
                  task.status
                    ? "bg-emerald-500 shadow-sm"
                    : "bg-white/10 ring-1 ring-inset ring-white/20 hover:bg-white/15",
                ].join(" ")}
                aria-hidden='true'
              >
                <svg
                  viewBox='0 0 24 24'
                  className={[
                    "h-5 w-5 transition-all duration-150",
                    task.status
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75",
                  ].join(" ")}
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M20 6L9 17l-5-5' />
                </svg>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <TextInput
        placeholder='Add new task'
        value={addTask}
        onChange={(e) => {
          setAddTask(e.target.value)
        }}
        className='my-2'
      />
      <div className='flex justify-end'>
        {status ? (
          <Alert variant={status} size='sm' className='mr-auto'>
            {status === "success" ? "Task added." : "Failed to add task."}
          </Alert>
        ) : null}
        <Button
          size='sm'
          disabled={!addTask}
          onClick={() => handleAddTask(addTask)}
        >
          Save
        </Button>
      </div>
    </Card>
  )
}

export default TasksChecklist
