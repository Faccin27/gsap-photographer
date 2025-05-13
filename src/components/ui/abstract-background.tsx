export default function AbstractBackground({ pattern = "default" }) {
  const getPattern = () => {
    switch (pattern) {
      case "waves":
        return (
          <>
            <path
              d="M0,20 C20,40 50,0 100,20"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
            <path
              d="M0,80 C30,60 70,100 100,80"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
            <path
              d="M0,40 C40,60 60,20 100,40"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
          </>
        )
      case "diagonal":
        return (
          <>
            <path
              d="M0,30 C30,10 70,50 100,30"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
            <path
              d="M0,70 C20,90 80,50 100,70"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
          </>
        )
      case "cross":
        return (
          <>
            <path
              d="M0,10 C50,50 50,50 100,90"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
            <path
              d="M0,90 C50,50 50,50 100,10"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
          </>
        )
      default:
        return (
          <>
            <path
              d="M0,50 C20,30 50,70 100,50"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
            <path
              d="M0,30 C30,10 70,90 100,30"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
            <path
              d="M0,70 C40,90 60,10 100,70"
              className="abstract-line stroke-white/10 stroke-[0.2] fill-none"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
          </>
        )
    }
  }

  return (
    <div className="absolute inset-0 z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {getPattern()}
      </svg>
    </div>
  )
}
