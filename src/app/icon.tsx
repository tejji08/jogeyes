import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1c1a18 0%, #2a2623 100%)',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: '#7fd6c3',
            fontWeight: 'bold',
          }}
        >
          ✨
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
