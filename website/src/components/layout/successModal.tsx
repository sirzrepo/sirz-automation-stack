import Button from "../common/button";
import successImg from '../../assets/imgs/sucessIcon.svg'
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { allReduxSliceInfo, setGetStarted, setShowScheduleDemoModal, setShowSuccessModal } from "../../features/reduxSlice";

interface ISuccessModal {
    title?: string
    message?: string
    buttonLabel?: string
}

export default function SuccessModal({ title, message, buttonLabel }: ISuccessModal) {
    const { showSuccessModal } = useAppSelector(allReduxSliceInfo)
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(setShowSuccessModal(false))
        dispatch(setGetStarted(false))
        dispatch(setShowScheduleDemoModal(false))
    }
    if (!showSuccessModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-lg p-8 text-center bg-white rounded-3xl shadow-2xl border-0">
          {/* Success icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center">
              {/* Checkmark */}
              <img src={successImg} alt="" className="w-full h-full" />
            </div>
          </div>

          {/* Success message */}
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">{title || "Success"}</h2>

          <p className="text-gray-600 text-base mb-8 text-balance leading-relaxed">
          {message || ""}
          </p>

          {/* Close button */}
          <div className="max-w-[50%] mx-auto">
            <Button
                type="inverted"
                text={buttonLabel || "Okay, thanks!"}
                onClick={handleClose}
                className="w-full bg-blue-600 whitespace-nowrap hover:bg-blue-700 text-sm text-white font-medium py-3 rounded-full transition-colors"
            />
          </div>
        </div>
      </div>
    );
}