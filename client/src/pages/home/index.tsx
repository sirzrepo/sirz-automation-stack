import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import ProductIdeas from '../product-ideas/ProductIdeas';
import Project from '../projects/Projects';
import Document from '../documents/Documents';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


interface Project {
    id: number;
    documentName: string;
    documentContent: string;
    project: string;
    timeUploaded: string;
}

export default function Home() {

    const [isOpen] = useState(false);
    const {userData} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Disable scroll
        } else {
            document.body.style.overflow = "auto"; // Enable scroll
        }

        return () => {
            document.body.style.overflow = "auto"; // Reset scroll on unmount
        };
    }, [isOpen]);

    const tabItems = [
        {
            title: "product ideas",
            value: "project-ideas"
        },
        {
            title: "my projects",
            value: "my-projects"
        },
        {
            title: "my documents",
            value: "my-ducuments"
        },
    ]

    return (
        <section className='min-h-screen wz-full bdg-slate-400 w-[80%] m-auto py-20'>
            <div className='mb-10'>
                <h1 className='text-4xl font-bold mb-2 capitalize'>Hello 👋, {userData?.firstName} {userData?.lastName}</h1>
                <p className='text-lg'>Keep track of your project, tasks and documents here.</p>
            </div>

            <div className='w-full bg-white px-10 py-7'>
                <div className="container pax-4 mad:px-6 m-auto">
                    <Tabs defaultValue="project-ideas" className="w-full">

                        <TabsList className=" grid grid-cols-3 gap-5 items-center mb-8 sm:w-fit ">
                            {
                                tabItems.map((data, index: number) => (
                                    <TabsTrigger key={index} value={data.value} className=" rounded border-b-8 px-4 py-2 text-[18px] data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500">{data.title}</TabsTrigger>
                                ))
                            }
                        </TabsList>

                        <TabsContent value="project-ideas" className="mt-0">
                            <ProductIdeas />
                        </TabsContent>

                        <TabsContent value="my-projects" className="mt-0">
                            <Project />
                        </TabsContent>

                        <TabsContent value="my-ducuments" className="mt-0">
                            <Document />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </section>
    );
};