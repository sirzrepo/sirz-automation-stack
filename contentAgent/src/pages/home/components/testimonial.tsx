import { Avatar } from "../../../assets";

export default function TestimonialSection() {
  return (
    <section className="sm:w-[50%] w-[80%] mx-auto px-4 pt-8 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3380] tracking-tight">
          SEE HOW IT&apos;S TRANSFORMING
          <br />
          CONTENT CREATION
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="flex-shrink-0">
          <div className="text-8xl md:text-9xl font-serif text-transparent bg-gradient-to-b from-[#8cd9e6] to-[#41b3a3] bg-clip-text">
            &ldquo;
          </div>
        </div>

        <div className="flex-1">
          <blockquote className="text-xl text-center md:text-3xl font-medium text-gray-800 mb-6">
            Absolutely adore SIRz Ai content generator! A game-changer - incredibly powerful, yet ridiculously
            user-friendly. It enabled me to effortlessly create social media assets with ease, and even pre-fill them.
            And the icing on the cake - absolutely free to use!
          </blockquote>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={Avatar}
                alt="Shyam Verma"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Shyam Verma</p>
              <p className="text-sm text-gray-600">Digital creator</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
