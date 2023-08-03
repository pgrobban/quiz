export default function BaseBoard({ children }: { children: React.ReactNode }) {
  const baseRadius = 900;

  return (
    <div
      style={{
        height: baseRadius - 150,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: baseRadius,
          height: baseRadius,
          borderRadius: baseRadius,
          border: "2px solid #641C3B",
          overflow: "hidden",
          position: "relative",
          top: -60,
        }}
      >
        <div
          style={{
            width: baseRadius - 2,
            height: baseRadius - 2,
            borderRadius: baseRadius - 2,
            border: "2px solid #69312E",
          }}
        >
          <div
            style={{
              width: baseRadius - 4,
              height: baseRadius - 4,
              borderRadius: baseRadius - 4,
              border: "2px solid #D9474E",
              background: "radial-gradient(#2D1823,#5D3640,#D9474E)",
            }}
          >
            <div
              style={{
                width: 660,
                height: 660,
                borderRadius: 50,
                border: "2px solid #9D191F",
                position: "relative",
                left: 110,
                top: 110,
              }}
            >
              <div
                style={{
                  width: 658,
                  height: 658,
                  borderRadius: 48,
                  border: "2px solid #4F3635",
                  backgroundImage: "url(../images/clues-and-answers.avif)",
                  backgroundSize: "cover",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
