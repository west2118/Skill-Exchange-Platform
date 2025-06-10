import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold">LocalLoop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Community</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Guidelines</li>
              <li>Safety</li>
              <li>Success Stories</li>
              <li>Events</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Stay Connected</h3>
            <div className="flex space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            </div>
            <div className="mt-6">
              <Label className="mb-2 block">Get the latest updates</Label>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="flex-1" />
                <Button variant="outline">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
          <p>© 2023 LocalLoop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
