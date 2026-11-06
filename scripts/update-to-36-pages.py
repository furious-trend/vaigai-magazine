import json

def main():
    with open('src/data/content.json', 'r', encoding='utf-8') as f:
        content = json.load(f)

    content['meta']['totalPages'] = 36

    content['toc'] = [
        { 'page': 4, 'title': "What is Vaigai's Ikigai?", 'section': 'Vision' },
        { 'page': 5, 'title': 'About Vaigai College', 'section': 'Institution' },
        { 'page': 6, 'title': 'Civil: RACE Inauguration Ceremony', 'section': 'Academics' },
        { 'page': 7, 'title': 'Mechanical: MESA-2026 Inaugural Function', 'section': 'Academics' },
        { 'page': 8, 'title': 'ECE and EEE: Embedded Systems and IoT Workshop', 'section': 'Academics' },
        { 'page': 9, 'title': 'Faculty Development Programme (FDC)', 'section': 'Clubs' },
        { 'page': 10, 'title': 'Youth Red Cross and Red Ribbon Club: Health Awareness', 'section': 'Clubs' },
        { 'page': 11, 'title': 'NSS, YRC and RRC: Blood Donation Camp', 'section': 'Social Service' },
        { 'page': 12, 'title': 'RRC: State-Level Online Quiz Competition', 'section': 'Clubs' },
        { 'page': 13, 'title': 'Anti-Drug Club: Awareness and Mass Pledge', 'section': 'Clubs' },
        { 'page': 14, 'title': 'EDC: Entrepreneurship and Startup Programme', 'section': 'Innovation' },
        { 'page': 15, 'title': 'NSS: 78th Independence Day Celebration', 'section': 'Clubs' },
        { 'page': 16, 'title': 'Anna University Rank Holders Spotlight', 'section': 'Honours' },
        { 'page': 17, 'title': 'Anna University Rank Holders Poster', 'section': 'Honours' },
        { 'page': 18, 'title': 'TPC: Expert Talk on Habits of High Performers', 'section': 'Placement' },
        { 'page': 19, 'title': 'TPC: On-Campus Drive (Beasant Technologies)', 'section': 'Placement' },
        { 'page': 20, 'title': 'TPC: Selected Students (JRIP 16 Students)', 'section': 'Placement' },
        { 'page': 21, 'title': 'TPC: Pooled Campus Drive (INOVONZ)', 'section': 'Placement' },
        { 'page': 22, 'title': 'TPC: Off-Campus Drive (Newrta Solutions)', 'section': 'Placement' },
        { 'page': 23, 'title': 'TPC: Selected Student S. Maadhesh and TACT Level 1', 'section': 'Placement' },
        { 'page': 24, 'title': 'Faculty Programmes Attended (Rows 1–8)', 'section': 'Faculty' },
        { 'page': 25, 'title': 'Faculty Programmes Attended (Rows 9–16)', 'section': 'Faculty' },
        { 'page': 26, 'title': 'Student Achievements: Vairamuthu Contest', 'section': 'Students' },
        { 'page': 27, 'title': 'Student Achievements: Contest Poster', 'section': 'Students' },
        { 'page': 28, 'title': 'Faculty Publications in Reputed Journals (1–4)', 'section': 'Research' },
        { 'page': 29, 'title': 'Faculty Publications in Reputed Journals (5–7)', 'section': 'Research' },
        { 'page': 30, 'title': 'NPTEL Toppers – October 2025 (Rows 1–3)', 'section': 'NPTEL' },
        { 'page': 31, 'title': 'NPTEL Toppers – October 2025 (Rows 4–7)', 'section': 'NPTEL' },
        { 'page': 32, 'title': 'NPTEL Toppers – April 2026 (Rows 1–4)', 'section': 'NPTEL' },
        { 'page': 33, 'title': 'NPTEL Toppers – April 2026 (Rows 5–8)', 'section': 'NPTEL' },
        { 'page': 34, 'title': 'Acknowledgements and Official Contact', 'section': 'Closing' },
        { 'page': 35, 'title': 'A Tribute to Vaigai — The Heart Letter', 'section': 'Tribute' }
    ]

    with open('src/data/content.json', 'w', encoding='utf-8') as f:
        json.dump(content, f, indent=2, ensure_ascii=False)

    print('Successfully updated src/data/content.json for 36 pages!')

if __name__ == '__main__':
    main()

