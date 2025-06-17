import { CourseContextProvider } from "@/Context/CourceDetails";

function CourseDetailsPage({ children }: { children: React.ReactNode }) {
    return (
        <CourseContextProvider>
            {children}
        </CourseContextProvider>
    )
}

export default CourseDetailsPage;
