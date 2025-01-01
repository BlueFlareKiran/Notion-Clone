'use client'
import * as Y from "yjs";
import React, { useState, useTransition } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

type Language =
  "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
];

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Value } from "@radix-ui/react-select";
  
export default function TranslateDocument({doc}:{doc :Y.Doc}) {

      const [isOpen, setIsOpen] = useState(false);
      const [isPending, startTransition] = useTransition();
      const [language,setLanguage]=useState<string>("");
      const [summary,setSummary]=useState("");
      const [question,setQuestion]=useState("");
    //   const [Language,setLanguage]=useState<string>("");

    const handleAskQuestion=(e:React.FormEvent)=>{
        e.preventDefault();
        startTransition(async ()=>{
           
        })
    };
    
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant={"outline"}>
      <DialogTrigger>TranslateDocument</DialogTrigger>
    </Button>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Translate the Document</DialogTitle>
        <DialogDescription>
          Select a language and AI will translate a summary of the document in the selected language
        </DialogDescription>
      </DialogHeader>

      <form className="flex gap-2" onSubmit={handleAskQuestion}>
        <Select
         value={language}
         onValueChange={(Value)=>setLanguage(Value)}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Language"/>
            </SelectTrigger>

        </Select>
        <Button type="submit" disabled={!language || isPending}>
          {isPending ? "Translating..." : "Translate"}
        </Button>
      </form>
    </DialogContent>
  </Dialog>
  )
}
