import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
// import ProductIdeas from '../product-ideas/ProductIdeas';
// import Project from '../projects/Projects';
// import Document from '../documents/Documents';
import IntroductoryCourses from '../courses/IntroductoryCourses';
import Library from '../courses/Library';

// interface Project {
//     id: number;
//     documentName: string;
//     documentContent: string;
//     project: string;
//     timeUploaded: string;
// }

 export default function Courses () {
    const [isOpen] = useState(false);
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

    return (
        <section className='min-h-screen wz-full bdg-slate-400 w-[80%] m-auto py-20'>
            <div className='mb-10'>
                <h1 className='text-4xl font-bold mb-2'>Introductory courses</h1>
                <p className='text-lg'>Keep track of your project, tasks and documents here</p>
            </div>

            <div className='w-full bg-white px-10 py-7'>
                <div className="container pax-4 mad:px-6 m-auto">
                    <Tabs defaultValue="courses" className="w-full">

                        <TabsList className="sm:flex grid grid-cols-1 gap-5 items-center mb-8 border-b-2 pb-4 bjg-[#F6F6F6]">
                            <TabsTrigger value="courses" className="rounded border-b-8 px-4 py-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500">Courses</TabsTrigger>
                            <TabsTrigger value="library" className="rounded border-b-8 px-4 py-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500">My Library</TabsTrigger>
                        </TabsList>

                        <TabsContent value="courses" className="mt-0">
                            <IntroductoryCourses />
                        </TabsContent>

                        <TabsContent value="library" className="mt-0">
                            <Library />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </section>
    );
};