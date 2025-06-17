/* eslint-disable react-hooks/rules-of-hooks */
import { CourseContext } from "@/Context/CourceDetails";
import { useContext, useEffect } from "react";

export default function Startprocess() {
    try {
        const {  setSummary,summary, questions, setQuestions, response } = useContext(CourseContext);
        
        if (response?.weekly_plan) {
            setSummary(response.weekly_plan.flatMap(data => 
                data?.topics?.map(d => ({
                    title: d?.topic_name,
                    summary: d?.summary,
                })) || []
            ));

            setQuestions(response.weekly_plan.flatMap(data =>
                data?.topics?.map(d => ({
                    difficulty: d?.difficulty, 
                    questions: d?.questions,
                })) || []
            ));
        }
        useEffect(() => {
            console.log('Summary:', summary);
            console.log('Questions:', questions);
        }, [summary, questions]);
    } catch (e) {
        console.error('Error in Startprocess:', e);
    }
}
