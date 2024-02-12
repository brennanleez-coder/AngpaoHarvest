import React, {useState, useEffect} from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
const formSchema = z.object({
    from: z.string().min(1, {
      message: "Username must be at least 1 character.",
    }),
    amount: z.number().min(1, {
      message: "Amount must be at least 1.",
    }),
    date: z.date({
      message: "Date is required",
    }),
    category: z.string({
      required_error: "Category is required",
    }),
    use: z.string({
      required_error: "Use is required",
    }),
    // image: z.string().optional(),
  })
   
 

export function AddAngPao() {
  // Initialize the form using the schema

  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const {toast} = useToast();


  const [selectedImage, setSelectedImage] = useState("");
  const [categories, setCategories] = useState(JSON.parse(localStorage.getItem("CNY")).settings.categories);
  const [uses, setUses] = useState(JSON.parse(localStorage.getItem("CNY")).settings.uses);
  function onSubmit(values) {
    if (localStorage.getItem('CNY') === null) return;

    const CNY = JSON.parse(localStorage.getItem('CNY'));
    const listOfAngpao = CNY.angpao;
    
    const latestId = listOfAngpao.length !== 0 ? listOfAngpao[listOfAngpao.length - 1].id + 1 : 1;
  
    values = {
      id: latestId,
      imageUrl: selectedImage,
      ...values,
      
    }
    console.log(values);
    console.log(selectedImage);
    listOfAngpao.push(values);
    localStorage.setItem('CNY', JSON.stringify({
      ...CNY,
      angpao: listOfAngpao
    }));

    toast({
      title: "Congratulations on your angpao!",
      description: "Angpao has been tracked",
    })
  
    form.reset();

  }

  const renderCategoryDropdown = () => {
    return (
      <Select
        onValueChange={(value) => form.setValue('category', value)}
        defaultValue=""
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category,index) => (
            <SelectItem key={index} value={category}>{category}</SelectItem>
          ))
          }
        </SelectContent>
      </Select>
    );
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        setSelectedImage(base64String)
      };
      reader.readAsDataURL(file);
    }
  
  };

  // Render function for use dropdown
  const renderUseDropdown = () => {
    return (
      <Select
        onValueChange={(value) => form.setValue('use', value)}
        defaultValue=""
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Use" />
        </SelectTrigger>
        <SelectContent>
          {uses.map((use,index) => (
            <SelectItem key={index} value={use}>{use}</SelectItem>
          ))
          }
        </SelectContent>
      </Select>
    );
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                The person you received the angpao from.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                      <Input type="number" placeholder="$0.00" {...field}
                          onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              field.onChange(value);
                          }
                      }
                      />
                  </FormControl>
                  <FormDescription>
                      The amount of money you received.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Received</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Date received of the angpao.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="category"
          render={() => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                {renderCategoryDropdown()}
              </FormControl>
              <FormDescription>The category of the angpao.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="use"
          render={() => (
            <FormItem>
              <FormLabel>Use</FormLabel>
              <FormControl>
                {renderUseDropdown()}
              </FormControl>
              <FormDescription>What will you use this angpao for.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="image"
          render={({field}) => (
            <FormItem>
              <FormLabel>Picture of your angpao</FormLabel>
              <FormControl>
                <Input type="file" {...field}
                            
                            onChange={handleFileUpload}
                            accept="image/*"
                        />
              </FormControl>
              <FormDescription>
                {selectedImage && <img src={`data:image/png;base64,${selectedImage}`} className="max-w-xs max-h-64 rounded-md" alt="Uploaded Image"/>}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}


        <Button type="submit">Submit</Button>
      </form>
    </Form>
    );
}
