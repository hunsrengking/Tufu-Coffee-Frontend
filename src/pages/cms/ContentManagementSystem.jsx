import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ContentManagementSystem = () => {
    const { hasPermission } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Content Management System</h1>
                    <p className="text-sm text-slate-500 font-medium tracking-tight mt-1">Manage your website content.</p>
                </div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Printer Card */}
                {hasPermission("READ_USER") && (
                    <Link
                        to="/cms/slide"
                        className="group bg-white rounded-3xl ring-1 ring-slate-200 p-6 shadow-sm 
                       hover:shadow-md hover:ring-blue-400 hover:-translate-y-1 
                       transition-all duration-200 block"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center transition-colors group-hover:bg-blue-600">
                                <i className="fa-regular fa-images text-blue-600 text-xl group-hover:text-white"></i>
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600">
                                    Slides
                                </h2>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Manage and update website slides.
                                </p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ContentManagementSystem;
