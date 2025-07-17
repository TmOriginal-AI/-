import { useState, useEffect } from 'react';
import flowData from './data/flowchart_full.json';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LogoAchiOz from '@/assets/סמל אחי עוז צבעוני.png';
import LogoTM from '@/assets/T.M Original.png';



export default function FlowNodeViewer() {
  const [currentId, setCurrentId] = useState('C1');
  const [path, setPath] = useState(() => {
    const saved = localStorage.getItem('flowPath');
    return saved ? JSON.parse(saved) : ['C1'];
  });

  const node = flowData[currentId];

  useEffect(() => {
    localStorage.setItem('flowPath', JSON.stringify(path));
  }, [path]);

  const handleClick = (nextId) => {
    setCurrentId(nextId);
    setPath([...path, nextId]);
  };

  const handleBack = () => {
    if (path.length > 1) {
      const newPath = [...path];
      newPath.pop();
      setCurrentId(newPath[newPath.length - 1]);
      setPath(newPath);
    }
  };

  const handleReset = () => {
    setPath(['C1']);
    setCurrentId('C1');
    localStorage.removeItem('flowPath');
  };

  if (!node) return <div>צומת לא נמצא</div>;

  const progress = Math.min((path.length / 8) * 100, 100);
  const isEnd = currentId.startsWith('END');

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <img src={LogoTM} alt="T.M Original" className="h-12" />
        <img src={LogoAchiOz} alt="אחי עוז" className="h-12" />
      </div>

      {path.length === 1 && (
        <div className="mb-4">
        </div>
      )}

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-right mt-1">התקדמות: {path.length} תחנות</p>
      </div>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{currentId}</h2>
          <p className="mb-4 whitespace-pre-line">{node.situation}</p>

          {!isEnd && (
            <div className="grid gap-2">
              {node.options.map((opt, index) => (
                <Button
                  key={index}
                  onClick={() => handleClick(opt.next)}
                  className="text-right"
                >
                  {opt.text}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {node.reflection && (
        <div className="bg-gray-100 rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-2">📝 משימת רפלקציה:</h3>
          <p>{node.reflection}</p>
        </div>
      )}

      <div className="mt-4 text-center space-x-2 rtl:space-x-reverse">
        {path.length > 1 && (
          <Button variant="outline" onClick={handleBack}>⬅ חזור</Button>
        )}
        {isEnd && (
          <Button variant="default" onClick={handleReset}>🔄 התחל מסלול חדש</Button>
        )}
      </div>

      {isEnd && (
        <div className="mt-6 p-4 bg-green-50 border rounded-xl shadow">
          <h3 className="font-semibold mb-2">📍 סיכום מסלול שעברת:</h3>
          <ul className="list-disc list-inside text-sm">
            {path.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
