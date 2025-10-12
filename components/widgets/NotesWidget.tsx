
import React from 'react';
import { WidgetConfig } from '../../types';

interface NotesWidgetProps {
  config: WidgetConfig;
}

// A very basic pseudo-markdown parser for demonstration.
// In a real app, you would use a library like 'marked' or 'react-markdown'.
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n').map((line, index) => {
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-xl font-bold text-white mb-2">{line.substring(2)}</h1>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-lg font-bold text-white mb-2">{line.substring(3)}</h2>;
    }
    if (line.trim() === '') {
        return <br key={index} />;
    }
    // Basic bold and italic
    const parts = line.split(/(\*.*?\*|__.*?__)/g).map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('__') && part.endsWith('__')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        return part;
    });
    return <p key={index} className="text-gray-300 mb-2">{parts}</p>;
  });

  return <div className="prose prose-invert prose-sm max-w-none">{lines}</div>;
};


const NotesWidget: React.FC<NotesWidgetProps> = ({ config }) => {
  const { content } = config;

  return (
    <div className="h-full overflow-auto">
      <SimpleMarkdown content={content || ''} />
    </div>
  );
};

export default NotesWidget;
