import DistortedHeading from "./distorted-heading"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  center?: boolean
  className?: string
  size?: "small" | "medium" | "large"
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
  className = "",
  size = "large",
}: SectionHeadingProps) {
  return (
    <div className={`${center ? "text-center" : ""} mb-16 ${className}`}>
      <DistortedHeading title={title} center={center} size={size} />
      {subtitle && <p className={`text-gray-400 mt-4 ${center ? "max-w-2xl mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  )
}
