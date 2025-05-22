import { FaInstagram, FaEnvelope, FaXTwitter, FaGithub } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0B0A2D] text-white py-20 px-4 md:px-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Popular Features */}
        <div>
          <h4 className="font-semibold mb-4">Popular Features</h4>
          <ul className="space-y-2">
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'socialMediaTemplates'}`)}>Social Media Templates</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'adCreatives'}`)}>Ad Creatives</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'leadScoringAgent'}`)}>AI Lead Score Tool</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'seoBomber'}`)}>SEO Scoring Ai Tool</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'brandkitGenerator'}`)}>Branding Kits</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'websiteGrader'}`)}>Website Grader</li>
          </ul>
        </div>

        {/* Free AI Tools */}
        <div>
          <h4 className="font-semibold mb-4">Free AI Tools</h4>
          <ul className="space-y-2">
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'websiteBuilder'}`)}>Website Builder</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'marketingAnalytics'}`)}>Marketing Analytics</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'landingPageBuilder'}`)}>Landing Page Builder</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'websiteGrader'}`)}>Website Grader</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'brandkitGenerator'}`)}>Brand Kit Generator</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'tweetGenerator'}`)}>Tweet Generator</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'storyGenerator'}`)}>Story Generator</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'seoBomber'}`)}>SEO Bomber</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'aiContentCreator'}`)}>AI Content Creator</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'crmSync'}`)}>CRM Sync</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'leadScoringAgent'}`)}>Lead Scoring Agent</li>
            <li className="cursor-pointer" onClick={() => navigate(`/services/${'smartChatbot'}`)}>Smart Chat Bot</li>
          </ul>
        </div>

        {/* Sitemap */}
        <div>
          <h4 className="font-semibold mb-4">Sitemap</h4>
          <ul className="space-y-2">
            <li className="cursor-pointer" onClick={() => navigate(`/`)}>Home</li>
            <li className="cursor-pointer" onClick={() => navigate(`/ecommerce`)}>E-Commerce Automation</li>
            <li className="cursor-pointer" onClick={() => navigate(`/branding`)}>Branding Automation</li>
            <li className="cursor-pointer" onClick={() => navigate(`/digital-marketing`)}>Digital Marketing</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Get In Touch</h4>
          <ul className="space-y-2">
            <li className="cursor-pointer" onClick={() => navigate(`/contact`)}>Book A Consultation</li>
            <li>+122 555 555</li>
            <li>info@brandcom.ai</li>
          </ul>
        </div>
      </div>

      {/* Branding and Socials */}
      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold mb-4">Brandcom.ai</h2>
        <div className="flex justify-center space-x-6 text-lg mb-4">
          <FaInstagram />
          <FaEnvelope />
          <FaXTwitter />
          <FaGithub />
        </div>
        <p className="mb-1">Need help? Contact Support</p>
        <p className="text-xs text-gray-400">2025 Brandcom.ai</p>
      </div>
    </footer>
  );
};

export default Footer;
