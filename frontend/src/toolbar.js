// toolbar.js

import {
    FiLogIn,
    FiCpu,
    FiLogOut,
    FiType,
    FiDivide,
    FiShuffle,
    FiRefreshCw,
    FiSend,
    FiDatabase,
} from 'react-icons/fi';
  

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className='toolbar'>
            <div className='toolbar-title'></div>
            <div className='toolbar-grid'>
                <DraggableNode type="customInput" label="Input" icon={FiLogIn} />
                <DraggableNode type="llm" label="LLM" icon={FiCpu} />
                <DraggableNode type="customOutput" label="Output" icon={FiLogOut} />
                <DraggableNode type="text" label="Text" icon={FiType} />
                <DraggableNode type="math" label="Math" icon={FiDivide} />
                <DraggableNode type="split" label="Split" icon={FiShuffle} />
                <DraggableNode type="transform" label="Transform" icon={FiRefreshCw} />
                <DraggableNode type="request" label="Request" icon={FiSend} />
                <DraggableNode type="memory" label="Memory" icon={FiDatabase} />
            </div>
        </div>
    );
};
