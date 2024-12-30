import MenuItem from "@/Components/MenuItem";
import SubscriptionDetail from "@/Components/SubscriptionDetail";
import { Link } from "@inertiajs/react";
import { UserMenu, OthersMenu } from "../SidebarItem";

export default function Sidebar({ children, auth }) {
    return (
        <aside className="fixed z-50 w-[300px] h-full">
            <div className="flex flex-col p-[30px] pr-0 border-r border-gray-[#F1F1F1] overflow-y-auto h-full">
                <a href="/">
                    <img src="/images/moonton.svg" alt="" />
                </a>
                <div className="links flex flex-col mt-[60px] h-full gap-[50px]">
                    {/* <!-- Menu --> */}
                    <div>
                        <div className="text-gray-1 text-sm mb-4">Menu</div>
                        {UserMenu.map((menu) => (
                            <MenuItem
                                key={menu.text}
                                {...menu}
                                isActive={
                                    menu.link && route().current(menu.link)
                                }
                            />
                        ))}
                    </div>
                    {/* <!-- ./Menu --> */}

                    {/* <!-- Others --> */}
                    <div>
                        <div className="text-gray-1 side-link mb-4">Others</div>
                        {OthersMenu.map((menu) => (
                            <MenuItem
                                key={menu.text}
                                {...menu}
                                isActive={
                                    menu.link && route().current(menu.link)
                                }
                            />
                        ))}
                    </div>
                    {/* <!-- ./Others --> */}

                    {/* Subscription Detail */}
                    {auth.activeSubscription && (
                        <SubscriptionDetail
                            name={auth.activeSubscription.name}
                            isPremium={
                                auth.activeSubscription.name === "Premium"
                            }
                            activeDays={auth.activeSubscription.activeDays}
                            remainingDays={
                                auth.activeSubscription.remainingDays
                            }
                        />
                    )}
                    {/* End Subscription Detail */}
                </div>
            </div>
        </aside>
    );
}
