export interface RobotProduct {
  id: string
  name: string
  subtitle: string
  price: number
  priceFormatted: string
  monthlyFrom: string
  shortDescription: string
  description: string
  heroImage: string
  images: string[]
  specs: { label: string; value: string }[]
  features: { title: string; description: string }[]
  functions: string[]
}

export const robots: RobotProduct[] = [
  {
    id: 'unitree-g1',
    name: 'Unitree G1',
    subtitle: 'Robot humanoidalny',
    price: 99000,
    priceFormatted: '99 000',
    monthlyFrom: '~2 500',
    shortDescription: 'Niezwykle zwinny robot humanoidalny z 23 stopniami swobody. Chodzi, biega, tańczy i wchodzi po schodach.',
    description:
      'Unitree G1 to niezwykle zwinny, mobilny robot humanoidalny, zdolny do wykonywania skomplikowanych ruchów, takich jak chodzenie po schodach, wstawanie z ziemi, czy nawet salto w bok. Posiada 23 stopnie swobody, waży 35 kg i mierzy 127 cm wysokości.',
    heroImage: '/robot/g1-1.jpg',
    images: [
      '/robot/g1-1.jpg',
      '/robot/g1-2.jpg',
      '/robot/g1-3.jpg',
      '/robot/g1-4.jpg',
      '/robot/g1-5.jpg',
      '/robot/g1-6.jpg',
      '/robot/g1-7.jpg',
      '/robot/g1-8.jpg',
      '/robot/g1-9.jpg',
      '/robot/g1-10.jpg',
      '/robot/g1-11.jpg',
    ],
    specs: [
      { label: 'Stopnie swobody', value: '23' },
      { label: 'Waga', value: '35 kg' },
      { label: 'Wysokość', value: '127 cm' },
      { label: 'Czas pracy', value: 'do 2h' },
      { label: 'Prędkość', value: '2 m/s' },
      { label: 'Udźwig', value: '2 kg' },
      { label: 'LiDAR', value: 'Livox MID-360' },
      { label: 'Kamera głębi', value: 'Intel RealSense D435i' },
      { label: 'Procesor', value: '8-rdzeniowy Jetson Orin' },
      { label: 'Łączność', value: 'WiFi 6 + BT 5.2' },
      { label: 'Bateria', value: '9000 mAh' },
      { label: 'Moment obrotowy', value: 'do 120 Nm' },
    ],
    features: [
      {
        title: 'Mobilna konstrukcja',
        description:
          'Dzięki dużej liczbie stopni swobody i zaawansowanym algorytmom, robot potrafi wykonywać niezwykle skomplikowane ruchy. Silniki o momencie obrotowym do 120 Nm zapewniają wyjątkową stabilność.',
      },
      {
        title: 'Sztuczna inteligencja',
        description:
          'Oprogramowanie jest cały czas rozwijane. Robot uczy się przez naśladowanie ze wzmocnieniem oraz na podstawie obserwacji ruchów ludzi. Platforma UnifoLM pozwala na łączenie się z innymi jednostkami.',
      },
      {
        title: 'Bogate wyposażenie',
        description:
          'Moduł LiDAR Livox MID-360, kamera głębi Intel RealSense D435i, 8-rdzeniowy procesor Jetson Orin, WiFi 6, Bluetooth 5.2, głośnik i mikrofon.',
      },
      {
        title: 'Zasilanie',
        description:
          'Akumulator 9000 mAh pozwalający na pracę do 2 godzin. Ładowarka 300W. Uruchamianie z pozycji siedzącej lub stojącej po podwieszeniu.',
      },
    ],
    functions: ['Chód', 'Bieg', 'Chodzenie po schodach', 'Taniec', 'Manipulacja obiektami', 'Rozpoznawanie otoczenia'],
  },
  {
    id: 'unitree-h1',
    name: 'Unitree H1',
    subtitle: 'Robot humanoidalny zaawansowany',
    price: 150000,
    priceFormatted: '150 000',
    monthlyFrom: '~3 800',
    shortDescription: 'Zaawansowany robot humanoidalny nowej generacji z pełnorozmiarowymi kończynami i mocniejszymi silnikami.',
    description:
      'Unitree H1 to pełnorozmiarowy robot humanoidalny nowej generacji. Wyższy i mocniejszy od G1, z zaawansowanymi możliwościami manipulacji obiektami.',
    heroImage: '/robot/g1-1.jpg',
    images: ['/robot/g1-1.jpg'],
    specs: [
      { label: 'Stopnie swobody', value: '26' },
      { label: 'Waga', value: '47 kg' },
      { label: 'Wysokość', value: '180 cm' },
      { label: 'Czas pracy', value: 'do 4h' },
    ],
    features: [],
    functions: ['Chód', 'Bieg', 'Manipulacja obiektami'],
  },
  {
    id: 'unitree-go2',
    name: 'Unitree Go2',
    subtitle: 'Robot czworonożny',
    price: 60000,
    priceFormatted: '60 000',
    monthlyFrom: '~1 500',
    shortDescription: 'Wszechstronny robot czworonożny do zastosowań przemysłowych, edukacyjnych i rozrywkowych.',
    description:
      'Unitree Go2 to wszechstronny robot czworonożny idealny do patrolowania, inspekcji i edukacji. Kompaktowy i wytrzymały.',
    heroImage: '/robot/g1-1.jpg',
    images: ['/robot/g1-1.jpg'],
    specs: [
      { label: 'Stopnie swobody', value: '12' },
      { label: 'Waga', value: '15 kg' },
      { label: 'Prędkość', value: '3.5 m/s' },
      { label: 'Czas pracy', value: 'do 2h' },
    ],
    features: [],
    functions: ['Chód', 'Bieg', 'Taniec', 'Patrol'],
  },
]

export function getRobotById(id: string): RobotProduct | undefined {
  return robots.find((r) => r.id === id)
}
