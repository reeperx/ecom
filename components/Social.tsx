import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

interface SocialProps {
  onSocialLogin: (provider: string) => void;
}

const Social: React.FC<SocialProps> = ({ onSocialLogin }) => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onSocialLogin("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onSocialLogin("facebook")}
      >
        <FaFacebook className="h-5 w-5 text-blue-600" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onSocialLogin("tiktok")}
      >
        <FaTiktok className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;