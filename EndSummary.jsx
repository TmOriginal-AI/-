import React from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";

const EndSummary = ({ path, endNode }) => {
  const exportToPDF = () => {
    const element = document.getElementById("export-content");
    html2pdf().from(element).save("המסלול-שלי.pdf");
  };

  const exportToClipboard = () => {
    const text = `סיכום המסלול שלי:\n\n` +
      path.map(p => `צומת ${p.nodeId}: ${p.choiceText}`).join('\n') +
      `\n\nתובנה מסכמת:\n${endNode.summary}`;

    navigator.clipboard.writeText(text).then(() => {
      alert("הרפלקציה הועתקה ללוח!");
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow" id="export-content">
      <h2 className="text-2xl font-bold mb-4">סיכום המסלול שלך</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">הבחירות שלך:</h3>
        <ul className="list-disc pr-5">
          {path.map((step, idx) => (
            <li key={idx}>
              <strong>צומת {step.nodeId}:</strong> {step.choiceText}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">תובנת סיום:</h3>
        <p className="text-gray-700">{endNode.summary}</p>
      </div>

      <div className="flex gap-4">
        <Button onClick={exportToPDF}>ייצא ל־PDF</Button>
        <Button onClick={exportToClipboard}>העתק ללוח</Button>
      </div>
    </div>
  );
};

export default EndSummary;
