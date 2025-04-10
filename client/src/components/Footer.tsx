export default function Footer() {
    return (
        <div className={`sm:p-8 p-4 text-center  min-w-svw shadow-lg dark:shadow-secondary `}>
            <p className="md:text-lg text-sm mx-auto ">
                © Website Developed by{" "}
                <a
                    target="_blank"
                    className="text-[#6D28D9]"
                    href="https://www.linkedin.com/in/akshat-tandon-a29190242/"
                >
                    Akshat Tandon{" "}
                </a>
            </p>

        </div>
    );
}
