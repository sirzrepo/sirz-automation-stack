import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductIdeas from '../clientProfile/components/product-ideas/ProductIdeas';
import Projects from './components/projects/Projects';
import Documents from './components/documents/Documents';
import { clientsAPI } from '../../services/api';
import { DefaultProfileImg } from '../../assets';

export default function ClientProfile() {
    const [isOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [clientData, setClientData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get client ID from URL query parameters
    const clientId = searchParams.get('id');

    // Fetch client data
    useEffect(() => {
        const fetchClientData = async () => {
            if (!clientId) {
                setError("No client ID provided");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const response = await clientsAPI.getClientById(clientId);
                setClientData(response.data);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.message || "Failed to fetch client data");
                setIsLoading(false);
                console.error("Error fetching client data:", err);
            }
        };

        fetchClientData();
    }, [clientId]);

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

    // If no client ID is provided, redirect to clients page
    useEffect(() => {
        if (!clientId && !isLoading) {
            navigate('/clients');
        }
    }, [clientId, isLoading, navigate]);

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
            value: "my-documents"
        },
    ];

    // Helper to get client name
    const getClientName = () => {
        if (!clientData) return '';
        
        if (clientData.first_name || clientData.last_name) {
            return `${clientData.first_name || ''} ${clientData.last_name || ''}`.trim();
        }
        return clientData.email?.split('@')[0] || 'Client';
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-red-700">
                <h2 className="text-xl font-bold mb-2">Error Loading Client Profile</h2>
                <p>{error}</p>
                <button 
                    onClick={() => navigate('/clients')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Return to Clients
                </button>
            </div>
        );
    }

    return (
        <section className='w-full w-[95%] m-auto'>
            <div className='mb-10 flex items-center gap-6'>
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-blue-300">
                    <img 
                        src={clientData?.image || DefaultProfileImg} 
                        alt={getClientName()} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h1 className='text-4xl font-bold mb-2 capitalize'> {getClientName()}</h1>
                    <p className='text-lg'>{clientData?.email}</p>
                </div>
            </div>

            <div className='w-full bg-white px-10 py-7'>
                <div className="container m-auto">
                    <Tabs defaultValue="project-ideas" className="w-full">

                        <TabsList className="grid grid-cols-3 gap-5 items-center mb-8 sm:w-fit">
                            {
                                tabItems.map((data, index: number) => (
                                    <TabsTrigger key={index} value={data.value} className="rounded border-b-8 px-4 py-2 text-[18px] data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500">{data.title}</TabsTrigger>
                                ))
                            }
                        </TabsList>

                        <TabsContent value="project-ideas" className="mt-0">
                            <ProductIdeas clientId={clientId} />
                        </TabsContent>
                        <TabsContent value="my-projects" className="mt-0">
                            <Projects clientId={clientId} />
                        </TabsContent>
                        <TabsContent value="my-documents" className="mt-0">
                            <Documents clientId={clientId} />
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </section>
    );
};