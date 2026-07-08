const formTemplate = [
    {
        title: "Pengurus Lingkungan",
        fields: [
            {
                key: "ketuaLingkungan",
                label: "Ketua Lingkungan",
                surveys: ["sinodalitas"],
            },
            {
                key: "sekretaris",
                label: "Sekretaris",
                surveys: ["sinodalitas"],
            },
            {
                key: "bendahara",
                label: "Bendahara",
                surveys: ["sinodalitas"],
            },
        ],
    },

    {
        title: "Umat",
        fields: [
            {
                key: "piud1",
                label: "PIUD (Usia <=5 tahun) - Responden 1",
                surveys: ["fibb"],
            },
            {
                key: "piud2",
                label: "PIUD (Usia <=5 tahun) - Responden 2",
                surveys: ["fibb"],
            },

            {
                key: "pia1",
                label: "PIA (Usia 6-10 tahun) - Responden 1",
                surveys: ["fibb"],
            },
            {
                key: "pia2",
                label: "PIA (Usia 6-10 tahun) - Responden 2",
                surveys: ["fibb"],
            },

            {
                key: "pir1",
                label: "PIR (Usia 11-14 tahun) - Responden 1",
                surveys: ["fibb"],
            },
            {
                key: "pir2",
                label: "PIR (Usia 11-14 tahun) - Responden 2",
                surveys: ["fibb"],
            },

            {
                key: "piom1",
                label: "PIOM (Usia 15-35 tahun) - Responden 1",
                surveys: [
                    "sinodalitas",
                    "fibb",
                ],
            },
            {
                key: "piom2",
                label: "PIOM (Usia 15-35 tahun) - Responden 2",
                surveys: [
                    "sinodalitas",
                    "fibb",
                ],
            },

            {
                key: "piod1",
                label: "PIOD (Usia 36-60 tahun) - Responden 1",
                surveys: [
                    "sinodalitas",
                    "fibb",
                ],
            },
            {
                key: "piod2",
                label: "PIOD (Usia 36-60 tahun) - Responden 2",
                surveys: [
                    "sinodalitas",
                    "fibb",
                ],
            },

            {
                key: "piul1",
                label: "PIUL (Usia > 60 tahun) - Responden 1",
                surveys: ["fibb"],
            },
            {
                key: "piul2",
                label: "PIUL (Usia > 60 tahun) - Responden 2",
                surveys: ["fibb"],
            },
        ],
    },
];

export default formTemplate;