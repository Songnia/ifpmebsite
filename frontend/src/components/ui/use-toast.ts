import { toast as hotToast } from "react-hot-toast";

export const useToast = () => {
    return {
        toast: ({ title, description, variant }: { title: string, description: string, variant?: "default" | "destructive" }) => {
            const message = title + ": " + description;
            if (variant === "destructive") {
                hotToast.error(message);
            } else {
                hotToast.success(message);
            }
        }
    };
};
