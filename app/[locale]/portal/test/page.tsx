export default function TestPage() {
  return (
    <div className="w-full bg-blue ">
      <div className="gap-2 inline-flex flex-col">
        <div
          style={{
            backgroundColor: "red",
            display: "inline-flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <div className="h-12 w-12 bg-green-500"></div>
          <div className="h-12 w-12 bg-green-500"></div>
        </div>
        <div
          style={{
            backgroundColor: "red",
            display: "inline-flex",
            gap: "12px",
          }}
        >
          <div className="h-12 w-12 bg-green-500"></div>
          <div className="h-12 w-12 bg-green-500"></div>
        </div>
      </div>
    </div>
  );
}
