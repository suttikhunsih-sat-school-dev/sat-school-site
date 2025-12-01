export interface VolunteerTeacher {
    id: string
    schoolName: string
    subject: string
    timeline: string
    latitude: number
    longitude: number
}

export interface ExpansionProject {
    id: string
    schoolName: string
    district: string
    region: string
    projectName: string
    startDate: string
    endDate: string
}
