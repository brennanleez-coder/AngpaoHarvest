import React, { useState, useEffect } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import ResetApp from '@/components/ResetApp';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';

const Settings = () => {
    const [settingOptions, setSettingOptions] = useState(() => {
        const savedSettings = JSON.parse(localStorage.getItem('CNY'))?.settings;
        return savedSettings || { categories: [], uses: [] };
    });
    const [categories, setCategories] = useState(settingOptions.categories);
    const [uses, setUses] = useState(settingOptions.uses);
    const [newField, setNewField] = useState('');

    useEffect(() => {
        // Update localStorage when settingOptions changes
        localStorage.setItem('CNY', JSON.stringify({ ...JSON.parse(localStorage.getItem('CNY')), settings: settingOptions }));
    }, [settingOptions]);

    const addCategory = () => {
        const newCategory = newField.trim();
        if (!newCategory) return;
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        setSettingOptions(prev => ({ ...prev, categories: updatedCategories }));
        setNewField('');
    }

    const addUse = () => {
        const newUse = newField.trim();
        if (!newUse) return;
        const updatedUses = [...uses, newUse];
        setUses(updatedUses);
        setSettingOptions(prev => ({ ...prev, uses: updatedUses }));
        setNewField('');
    }

    const removeCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
        setSettingOptions(prev => ({ ...prev, categories: updatedCategories }));
    }

    const removeUse = (index) => {
        const updatedUses = uses.filter((_, i) => i !== index);
        setUses(updatedUses);
        setSettingOptions(prev => ({ ...prev, uses: updatedUses }));
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="outline">Settings</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>Configure your settings here!</SheetDescription>

                    <SheetTitle>Categories</SheetTitle>
                    <SheetDescription>
                    {categories.map((category, index) => (
                        <div key={index} className="flex justify-between items-center w-full p-2 border-b border-gray-200">
                            <p>{category}</p>
                            <Button onClick={() => removeCategory(index)} variant="outline">
                                <Cross1Icon className='w-4 h-4 text-gray-500'/>
                            </Button>
                        </div>
                    ))}
                    <div className='flex justify-center items-center space-x-2'>
                        <Input
                            type="text"
                            value={newField}
                            onChange={(e) => setNewField(e.target.value)}
                            placeholder="Add Category"
                            className="w-3/4 my-2"
                        />
                        <Button onClick={addCategory} variant="secondary">Add</Button>

                    </div>

                    </SheetDescription>

                    <SheetTitle>Uses</SheetTitle>
                    <SheetDescription>
                        {uses.map((use, index) => (
                            <div key={index} className="flex justify-between items-center w-full p-2 border-b border-gray-200">
                                <p>{use}</p>
                                <Button onClick={() => removeUse(index)} variant="outline">
                                    <Cross1Icon className='w-4 h-4 text-gray-500'/>
                                </Button>
                            </div>
                        ))}
                        <div className='flex justify-center items-center space-x-2'>

                            <Input
                                type="text"
                                value={newField}
                                onChange={(e) => setNewField(e.target.value)}
                                placeholder="Add Use"
                                className="w-3/4 my-2"
                            />
                            <Button onClick={addUse} variant="secondary">Add</Button>
                        </div>

                    </SheetDescription>
                </SheetHeader>
                <div className='flex justify-center items-center p-2'>
                    <ResetApp />
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default Settings;
