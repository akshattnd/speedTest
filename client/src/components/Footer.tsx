import React from 'react'

const Footer: React.FC = () => {
    return (
        <div className={` flex flex-col  p-4 fixed bottom-0 w-full   justify-center  flex-wrap  shadow-lg dark:shadow-secondary `}>
            <div className="flex flex-col md:flex-row lg:gap-6 gap-4 justify-start md:justify-center  mdp-4 p-2 ">
                <p className="text-sm md:text-xl flex items-center gap-3">
                    <svg
                        strokeWidth="0"
                        viewBox="0 0 24 24 "
                        className="bg-[#8b98a5] p-2 rounded-full hover:bg-yellow-300   cursor-pointer"
                        height="36"
                        width="36"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                    </svg>
                    <span>akshattandon@gmail.com</span>
                </p>
                <p className="text-sm md:text-xl flex items-center gap-3">
                    <svg

                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="bg-[#8b98a5] p-2 rounded-full hover:bg-yellow-300   text-gray-800 cursor-pointer"
                        height="36"
                        width="36"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M426.666 330.667a250.385 250.385 0 0 1-75.729-11.729c-7.469-2.136-16-1.073-21.332 5.333l-46.939 46.928c-60.802-30.928-109.864-80-140.802-140.803l46.939-46.927c5.332-5.333 7.462-13.864 5.332-21.333-8.537-24.531-12.802-50.136-12.802-76.803C181.333 73.604 171.734 64 160 64H85.333C73.599 64 64 73.604 64 85.333 64 285.864 226.136 448 426.666 448c11.73 0 21.334-9.604 21.334-21.333V352c0-11.729-9.604-21.333-21.334-21.333z"></path>
                    </svg>
                    <span>+91 7454970729</span>
                </p>
                <p className="text-sm md:text-xl flex items-center gap-3">
                    <svg
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="bg-[#8b98a5] p-2 rounded-full hover:bg-yellow-300 text-gray-800 cursor-pointer"
                        height="36"
                        width="36"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Location_On">
                            <g>
                                <path d="M12,21.933a1.715,1.715,0,0,1-1.384-.691L5.555,14.5a7.894,7.894,0,1,1,12.885-.009L13.385,21.24A1.717,1.717,0,0,1,12,21.933ZM11.992,3.066A6.81,6.81,0,0,0,7.414,4.815a6.891,6.891,0,0,0-1.05,9.1l5.051,6.727a.725.725,0,0,0,.584.292h0a.732.732,0,0,0,.586-.292l5.044-6.734A6.874,6.874,0,0,0,12.81,3.113,7.277,7.277,0,0,0,11.992,3.066Z"></path>
                                <path d="M12,12.5A2.5,2.5,0,1,1,14.5,10,2.5,2.5,0,0,1,12,12.5Zm0-4A1.5,1.5,0,1,0,13.5,10,1.5,1.5,0,0,0,12,8.5Z"></path>
                            </g>
                        </g>
                    </svg>
                    <span> Agra, India 282003 </span>
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center">
                <p className="md:text-lg text-sm ">
                    © Portfolio Developed by{" "}
                    <a
                        target="_blank"
                        className="text-[#6D28D9]"
                        href="https://www.linkedin.com/in/akshat-tandon-a29190242/"
                    >
                        Akshat Tandon{" "}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Footer