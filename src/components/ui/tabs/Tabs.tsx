"use client";
import '@/src/components/ui/tabs/Tabs.scss'
import { useState } from 'react';

type Tab = {
    title: string;
    content: React.ReactNode;
};

const Tabs = ({ tabs }: { tabs: Tab[] }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className='tabs-container'>
            <div className='tabs-header'>
                {tabs.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabs-header-title ${index === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </span>
                ))}
            </div>
            <div className='tabs-content'>
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;