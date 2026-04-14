import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="p-5 bg-[#f0f0f0] text-center text-[14px] text-[#555] border-t border-[#ddd]">
      <div className="">
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className="flex justify-center gap-5">
          <p>Developer: Sergii Bartytskyi</p>
          <p>
            Contact us:
            <Link
              href="mailto:s.bartycjkyj@gmail.com"
              className="text-[#226ec5] hover:underline font-semibold no-underline "
            >
              s.bartycjkyj@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
