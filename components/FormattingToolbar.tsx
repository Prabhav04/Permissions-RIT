"use client";

import React from 'react';
import { 
  Bold, Italic, Underline, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Undo, Redo
} from 'lucide-react';
import { clsx } from 'clsx';

const FormattingToolbar = () => {
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);

  const checkHistory = React.useCallback(() => {
    // Small timeout to allow the DOM to update after an event
    setTimeout(() => {
      setCanUndo(document.queryCommandEnabled('undo'));
      setCanRedo(document.queryCommandEnabled('redo'));
    }, 0);
  }, []);

  React.useEffect(() => {
    // Listen for events that might change the undo stack
    const events = ['click', 'keyup', 'input', 'selectionchange'];
    events.forEach(event => document.addEventListener(event, checkHistory));
    
    return () => {
      events.forEach(event => document.removeEventListener(event, checkHistory));
    };
  }, [checkHistory]);

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    checkHistory(); // Check immediately after action
  };

  const ToolbarButton = ({ icon: Icon, command, value, label, disabled = false, isActive = false }: any) => (
    <button
      onMouseDown={(e) => e.preventDefault()} // Prevent losing focus from editor
      onClick={() => !disabled && applyFormat(command, value)}
      disabled={disabled}
      className={clsx(
        "p-2.5 rounded-lg transition-all duration-200",
        disabled 
          ? "text-gray-300 cursor-not-allowed" 
          : "text-gray-600 hover:bg-rit-light hover:text-rit-primary active:bg-rit-light",
        isActive && "bg-rit-light text-rit-primary"
      )}
      title={label}
      type="button"
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );

  return (
    <div className=" flex items-center gap-1 p-1 bg-white rounded-lg shadow-sm border border-gray-200 mx-auto no-print">
      <div className="flex gap-1">
        <ToolbarButton icon={Bold} command="bold" label="Bold" />
        <ToolbarButton icon={Italic} command="italic" label="Italic" />
        <ToolbarButton icon={Underline} command="underline" label="Underline" />
      </div>

      <div className="w-px h-5 bg-gray-200 mx-1 self-center" />

      <div className="flex gap-1">
        <ToolbarButton icon={AlignLeft} command="justifyLeft" label="Left Align" />
        <ToolbarButton icon={AlignCenter} command="justifyCenter" label="Center Align" />
        <ToolbarButton icon={AlignRight} command="justifyRight" label="Right Align" />
        <ToolbarButton icon={AlignJustify} command="justifyFull" label="Justify" />
      </div>

      <div className="w-px h-5 bg-gray-200 mx-1 self-center" />

      <div className="flex gap-1">
        <ToolbarButton icon={Undo} command="undo" label="Undo" disabled={!canUndo} />
        <ToolbarButton icon={Redo} command="redo" label="Redo" disabled={!canRedo} />
      </div>
    </div>
  );
};

export default FormattingToolbar;
