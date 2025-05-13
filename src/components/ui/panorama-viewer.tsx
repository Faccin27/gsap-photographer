"use client"

import { useEffect, useRef, useState } from "react"
import type { Viewer } from "photo-sphere-viewer"
import "photo-sphere-viewer/dist/photo-sphere-viewer.css"

interface PanoramaViewerProps {
  imageUrl: string
  height?: string | number
  width?: string | number
  className?: string
}

export default function PanoramaViewer({
  imageUrl,
  height = "500px",
  width = "100%",
  className = "",
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Viewer | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current && !viewerRef.current) {
      import("photo-sphere-viewer").then(({ Viewer }) => {
        try {
          viewerRef.current = new Viewer({
            container: containerRef.current!,
            panorama: imageUrl,
            size: {
              width: containerRef.current?.clientWidth ?? 0,
              height: containerRef.current?.clientHeight ?? 0,
            },
            navbar: ["autorotate", "zoom", "fullscreen"],
            defaultZoomLvl: 0,
            mousewheel: true,
            touchmoveTwoFingers: true,
            autorotateDelay: 3000, 
            autorotateSpeed: "1rpm", 
          })
          // Adicionar eventos
          viewerRef.current.once("ready", () => {
            setIsLoaded(true)
          })
        } catch (error) {
          console.error("Erro ao inicializar o visualizador 360°:", error)
        }
      })
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [imageUrl])

  return (
    <div className={`relative ${className}`} style={{ height, width }}>
      <div ref={containerRef} className="w-full h-full rounded-2xl overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
              <span className="text-white font-bold">360°</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
