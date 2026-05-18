import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #52525b 55%, #0a0a0a 100%)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: '#fff',
            boxShadow: '0 0 8px rgba(255,255,255,0.9)',
          }}
        />
      </div>
    ),
    size,
  );
}
