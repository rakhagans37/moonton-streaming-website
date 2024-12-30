import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Authenticated({ children, auth }) {
    return (
        <>
            <div className="mx-auto max-w-screen hidden lg:block">
                {/* START SIDEBAR */}
                <Sidebar auth={auth} />
                {/* END SIDEBAR */}

                {/* START CONTENT */}
                <div className="ml-[300px] px-[50px]">
                    <div className="py-10 flex flex-col gap-[50px]">
                        {/* START TOPBAR */}
                        <Topbar name={auth.user.name} />
                        {/* END TOPBAR */}
                        <main>{ children }</main>
                    </div>
                </div>
                {/* END CONTENT */}
            </div>
            <div className="mx-auto px-4 w-full h-screen lg:hidden flex bg-black"></div>
        </>
    );
}
