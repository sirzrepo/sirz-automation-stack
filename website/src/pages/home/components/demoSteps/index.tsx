import { useState } from "react";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";
import StepFive from "./stepFive";
import StepSix from "./stepSix";
import InitiateLevels from "./initiateLevels";
import StepSeven from "./stepSeven";
import SuccessModal from "../../../../components/layout/successModal";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { allReduxSliceInfo, setGetStarted, setShowSuccessModal } from "../../../../features/reduxSlice";
import { X } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../../../utils";

export default function DemoSteps() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { getStarted } = useAppSelector(allReduxSliceInfo)
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState({
        businessType: "",
        currentPlatform: "",
        challenge: "",
        marketTarget: "",
        isPaidAds: "",
        isAgency: "",
        futureGoal: "",
    });

    console.log('formData', formData);

    // Setters for each step
    const setBusinessType = (value: string) => setFormData(prev => ({ ...prev, businessType: value }));
    const setCurrentPlatform = (value: string) => setFormData(prev => ({ ...prev, currentPlatform: value }));
    const setChallenge = (value: string) => setFormData(prev => ({ ...prev, challenge: value }));
    const setMarketTarget = (value: string) => setFormData(prev => ({ ...prev, marketTarget: value }));
    const setIsPaidAds = (value: string) => setFormData(prev => ({ ...prev, isPaidAds: value }));
    const setIsAgency = (value: string) => setFormData(prev => ({ ...prev, isAgency: value }));
    const setFutureGoal = (value: string) => setFormData(prev => ({ ...prev, futureGoal: value }));

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/api/demo-data`, formData);
            console.log('response', response);
            dispatch(setShowSuccessModal(true));
            setTimeout(() => {
                dispatch(setShowSuccessModal(false))
                dispatch(setGetStarted(false))
                setStep(1)
                setFormData({
                    businessType: "",
                    currentPlatform: "",
                    challenge: "",
                    marketTarget: "",
                    isPaidAds: "",
                    isAgency: "",
                    futureGoal: "",
                })
            }, 10000);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCloseModal = () => {
        dispatch(setGetStarted(false))
    }

    const steps = [
        {
            title: "Initiate Levels",
            component: <InitiateLevels step={step} setStep={setStep} />
        },
        {
            title: "Step 1",
            component: <StepOne step={step} setStep={setStep} value={formData.businessType} setValue={setBusinessType} />
        },
        {
            title: "Step 2",
            component: <StepTwo step={step} setStep={setStep} value={formData.currentPlatform} setValue={setCurrentPlatform} />
        },
        {
            title: "Step 3",
            component: <StepThree step={step} setStep={setStep} value={formData.challenge} setValue={setChallenge} />
        },
        {
            title: "Step 4",
            component: <StepFour step={step} setStep={setStep} value={formData.marketTarget} setValue={setMarketTarget} />
        },
        {
            title: "Step 5",
            component: <StepFive step={step} setStep={setStep} value={formData.isPaidAds} setValue={setIsPaidAds} />
        },
        {
            title: "Step 6",
            component: <StepSix step={step} setStep={setStep} value={formData.isAgency} setValue={setIsAgency} />
        },
        {
            title: "Step 7",
            component: <StepSeven value={formData.futureGoal} setValue={setFutureGoal} formData={formData} handleSubmit={handleSubmit} />
        },
    ];
    if (!getStarted) return null;
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
            <div className="min-h-screen bg-gradient-to-br from-[#032247] via-[#2743b7] to-blue-300 flex items-center justify-center p-4">
                <div>
                  <X onClick={handleCloseModal} size={40} className="text-5xl absolute top-4 right-4 cursor-pointer bg-white p-2 rounded-full" />
                </div>
                {steps[step - 1].component}
            </div>
            <SuccessModal 
                message="You&apos;re in! Thanks for getting started with us. Our team will reach out shortly to guide you through the next steps"
            />
            {isLoading && <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            </div>}
        </div>
    );
}