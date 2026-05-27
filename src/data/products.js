import iphone16   from "../assets/iphone16.png";
import samsungS25 from "../assets/SamsungS25.png";
import MacM3 from "../assets/mac-air-m3.png";
import DellXPS from "../assets/dellxps.png";
import SonyWH from "../assets/sonywh1000.png";
import IpadM4 from "../assets/ipadprom4.png";
import AirPodsPro3erGEN from "../assets/AirPodsPro3raGEN.png";
import MonitorLG144Hz from "../assets/MonitorLG27Pulgadas.png";
import LogitechMxMaster from "../assets/Logitech_MX_Master.png";
import KeychronK2Pro from "../assets/KeychronK2Pro.png";
import GoProHero13 from "../assets/GoPro_Hero13.png";
import GalaxyTabS9 from "../assets/GalaxyTAB_S9.png"

export const CATEGORIES = [
  { slug: "smartphones",  label: "Smartphones"},
  { slug: "laptops",      label: "Laptops"},
  { slug: "audio",        label: "Audio"},
  { slug: "tablets",      label: "Tablets"},
  { slug: "monitores",    label: "Monitores"},
  { slug: "accesorios",   label: "Accesorios"},
  { slug: "camaras",      label: "Cámaras"},
  { slug: "perifericos",  label: "Periféricos"},
];

export const PRODUCTS = [
  {
    id: 1, name: "iPhone 16 Pro 256GB Titanio Natural",
    category: "Smartphones", categorySlug: "smartphones",
    price: 25999, originalPrice: 27999, image: "📱", badge: "Nuevo", rating: 5, reviews: 128, stock: 14,
    brand: "Apple", sku: "APL-IP16P-256-TN",
    img: iphone16,
    description: "El iPhone 16 Pro redefine lo que es posible en un smartphone. Con el chip A18 Pro, cámara de 48 MP con zoom óptico 5x y pantalla Super Retina XDR de 6.3\", ofrece el rendimiento más avanzado de Apple hasta la fecha.",
    specs: [
      { label: "Pantalla",         value: "6.3\" Super Retina XDR OLED" },
      { label: "Procesador",       value: "Apple A18 Pro" },
      { label: "RAM",              value: "8 GB" },
      { label: "Almacenamiento",   value: "256 GB" },
      { label: "Cámara principal", value: "48 MP + 12 MP + 12 MP" },
      { label: "Batería",          value: "3.582 mAh" },
      { label: "Sistema",          value: "iOS 18" },
      { label: "Color",            value: "Titanio Natural" },
    ],
  },
  {
    id: 2, name: "MacBook Air M3 13\" 16GB RAM",
    category: "Laptops", categorySlug: "laptops",
    price: 31499, originalPrice: null, image: "💻", badge: null, rating: 5, reviews: 89, stock: 7,
    brand: "Apple", sku: "APL-MBA-M3-16",
    img: MacM3,
    description: "La MacBook Air con chip M3 es increíblemente delgada y liviana con hasta 18 horas de batería. Compatible con dos pantallas externas simultáneamente, Wi-Fi 6E y Bluetooth 5.3.",
    specs: [
      { label: "Procesador",     value: "Apple M3 (8 núcleos CPU, 10 GPU)" },
      { label: "RAM",            value: "16 GB unificada" },
      { label: "Almacenamiento", value: "256 GB SSD" },
      { label: "Pantalla",       value: "13.6\" Liquid Retina 2560×1664" },
      { label: "Batería",        value: "Hasta 18 horas" },
      { label: "Puertos",        value: "2× USB-C Thunderbolt 3, MagSafe 3" },
      { label: "Sistema",        value: "macOS Sequoia" },
      { label: "Peso",           value: "1.24 kg" },
    ],
  },
  {
    id: 3, name: "Sony WH-1000XM5 Noise Cancelling",
    category: "Audio", categorySlug: "audio",
    price: 7499, originalPrice: 8999, image: "🎧", badge: "Oferta", rating: 4, reviews: 214, stock: 22,
    brand: "Sony", sku: "SNY-WH1000XM5-BK",
    img: SonyWH,
    description: "Los auriculares over-ear con la mejor cancelación de ruido del mercado. 8 micrófonos, procesador QN2 y hasta 30 horas de batería con cancelación activa activada.",
    specs: [
      { label: "Tipo",         value: "Over-ear inalámbrico" },
      { label: "Cancelación",  value: "Activa (ANC) con 8 micrófonos" },
      { label: "Batería",      value: "30 horas (con ANC)" },
      { label: "Carga rápida", value: "3 min → 3 horas" },
      { label: "Bluetooth",    value: "5.2, LDAC, AAC, SBC" },
      { label: "Driver",       value: "30 mm" },
      { label: "Peso",         value: "250 g" },
      { label: "Color",        value: "Negro" },
    ],
  },
  {
    id: 4, name: "iPad Pro 11\" M4 WiFi 128GB",
    category: "Tablets", categorySlug: "tablets",
    price: 19999, originalPrice: null, image: "📱", badge: "Popular", rating: 5, reviews: 67, stock: 10,
    brand: "Apple", sku: "APL-IPADPRO11-M4-128",
    img: IpadM4,
    description: "El iPad Pro más delgado jamás fabricado con pantalla Ultra Retina XDR OLED doble capa, chip M4 y compatibilidad con Apple Pencil Pro y Magic Keyboard.",
    specs: [
      { label: "Pantalla",       value: "11\" Ultra Retina XDR OLED" },
      { label: "Procesador",     value: "Apple M4" },
      { label: "RAM",            value: "8 GB" },
      { label: "Almacenamiento", value: "128 GB" },
      { label: "Cámara",         value: "12 MP gran angular + LiDAR" },
      { label: "Conectividad",   value: "WiFi 6E, Bluetooth 5.3" },
      { label: "Batería",        value: "Hasta 10 horas" },
      { label: "Sistema",        value: "iPadOS 18" },
    ],
  },
  {
    id: 5, name: "Samsung Galaxy S25 Ultra 512GB",
    category: "Smartphones", categorySlug: "smartphones",
    price: 24999, originalPrice: 26499, image: "📱", badge: "Oferta", rating: 4, reviews: 153, stock: 18,
    brand: "Samsung", sku: "SAM-S25U-512-TI",
    img: samsungS25,
    description: "El Galaxy S25 Ultra lleva el S Pen integrado, cámara de 200 MP con zoom óptico 5x y 10x, chip Snapdragon 8 Elite y pantalla Dynamic AMOLED 2X de 6.9\".",
    specs: [
      { label: "Pantalla",       value: "6.9\" Dynamic AMOLED 2X 120Hz" },
      { label: "Procesador",     value: "Snapdragon 8 Elite" },
      { label: "RAM",            value: "12 GB" },
      { label: "Almacenamiento", value: "512 GB" },
      { label: "Cámara",         value: "200 MP + 50 MP + 10 MP + 12 MP" },
      { label: "Batería",        value: "5.000 mAh, carga 45W" },
      { label: "Sistema",        value: "Android 15 / One UI 7" },
      { label: "S Pen",          value: "Incluido" },
    ],
  },
  {
    id: 6, name: "Dell XPS 15 i7 RTX 4060 32GB",
    category: "Laptops", categorySlug: "laptops",
    price: 42999, originalPrice: null, image: "💻", badge: "Nuevo", rating: 4, reviews: 41, stock: 5,
    brand: "Dell", sku: "DELL-XPS15-i7-4060",
    img: DellXPS,
    description: "La laptop creativa y gamer más potente de Dell. Pantalla OLED 3.5K táctil, GPU NVIDIA RTX 4060 y 32 GB de RAM DDR5 en un chasis de aluminio de 1.86 kg.",
    specs: [
      { label: "Procesador",     value: "Intel Core i7-13700H" },
      { label: "GPU",            value: "NVIDIA RTX 4060 8GB GDDR6" },
      { label: "RAM",            value: "32 GB DDR5" },
      { label: "Almacenamiento", value: "1 TB NVMe SSD" },
      { label: "Pantalla",       value: "15.6\" OLED 3.5K 60Hz táctil" },
      { label: "Batería",        value: "86 Wh, hasta 13 horas" },
      { label: "Puertos",        value: "2× Thunderbolt 4, USB-A, SD" },
      { label: "Sistema",        value: "Windows 11 Home" },
    ],
  },
  {
    id: 7, name: "AirPods Pro 3ra Generación USB-C",
    category: "Audio", categorySlug: "audio",
    price: 6999, originalPrice: 7499, image: "🎧", badge: null, rating: 5, reviews: 302, stock: 31,
    brand: "Apple", sku: "APL-APP3-USBC",
    img: AirPodsPro3erGEN,
    description: "Los AirPods Pro de 3ra generación con cancelación activa de ruido H2, audio espacial personalizado y estuche MagSafe con altavoz integrado.",
    specs: [
      { label: "Chip",            value: "Apple H2" },
      { label: "Cancelación",     value: "ANC adaptativo" },
      { label: "Audio",           value: "Espacial personalizado" },
      { label: "Batería",         value: "6 h (30 h con estuche)" },
      { label: "Resistencia",     value: "IP54 auriculares y estuche" },
      { label: "Conectividad",    value: "Bluetooth 5.3" },
      { label: "Carga",           value: "USB-C / MagSafe / Qi" },
      { label: "Compatibilidad",  value: "iOS 17+, iPadOS 17+, macOS Sonoma+" },
    ],
  },
  {
    id: 8, name: "Monitor LG 27\" 4K OLED 144Hz",
    category: "Monitores", categorySlug: "monitores",
    price: 18499, originalPrice: 20999, image: "🖥️", badge: "Oferta", rating: 4, reviews: 77, stock: 9,
    brand: "LG", sku: "LG-27GR95QE-B",
    img: MonitorLG144Hz,
    description: "Monitor OLED 4K de 27\" con 144Hz, tiempo de respuesta de 0.03ms y compatibilidad con NVIDIA G-Sync y AMD FreeSync Premium Pro.",
    specs: [
      { label: "Panel",     value: "OLED 27\" 4K (3840×2160)" },
      { label: "Tasa",      value: "144Hz" },
      { label: "Respuesta", value: "0.03ms GtG" },
      { label: "HDR",       value: "VESA DisplayHDR True Black 400" },
      { label: "Sync",      value: "G-Sync Compatible / FreeSync Premium Pro" },
      { label: "Puertos",   value: "2× HDMI 2.1, 1× DisplayPort 1.4, USB Hub" },
      { label: "Brillo",    value: "1000 nits (pico)" },
      { label: "Color",     value: "DCI-P3 98.5%" },
    ],
  },
  {
    id: 9, name: "Logitech MX Master 3S",
    category: "Periféricos", categorySlug: "perifericos",
    price: 2999, originalPrice: 3499, image: "🖱️", badge: "Oferta", rating: 5, reviews: 445, stock: 40,
    brand: "Logitech", sku: "LOG-MXM3S-GR",
    img: LogitechMxMaster,
    description: "El mouse inalámbrico más avanzado para productividad. Desplazamiento electromagnético MagSpeed, 8000 DPI y hasta 70 días de batería.",
    specs: [
      { label: "Sensor",      value: "Darkfield 8000 DPI" },
      { label: "Botones",     value: "7 programables" },
      { label: "Scroll",      value: "MagSpeed electromagnético" },
      { label: "Batería",     value: "70 días (USB-C)" },
      { label: "Conectividad",value: "Bluetooth + USB Logi Bolt" },
      { label: "Dispositivos",value: "Hasta 3 (Easy-Switch)" },
      { label: "Peso",        value: "141 g" },
      { label: "Color",       value: "Grafito" },
    ],
  },
  {
    id: 10, name: "Keychron K2 Pro Mecánico RGB",
    category: "Periféricos", categorySlug: "perifericos",
    price: 3799, originalPrice: null, image: "⌨️", badge: "Nuevo", rating: 4, reviews: 98, stock: 17,
    brand: "Keychron", sku: "KEY-K2PRO-RGB-RED",
    img: KeychronK2Pro,
    description: "Teclado mecánico TKL inalámbrico con switches hot-swap, retroiluminación RGB por tecla y compatibilidad con Mac y Windows.",
    specs: [
      { label: "Layout",       value: "75% (84 teclas)" },
      { label: "Switches",     value: "Keychron K Pro Red (hot-swap)" },
      { label: "Retroiluminación", value: "RGB por tecla" },
      { label: "Conectividad", value: "Bluetooth 5.1 / USB-C" },
      { label: "Batería",      value: "4000 mAh" },
      { label: "Cuerpo",       value: "Aluminio anodizado" },
      { label: "Compatibilidad",value: "Mac, Windows, iOS, Android" },
      { label: "Peso",         value: "980 g" },
    ],
  },
  {
    id: 11, name: "GoPro HERO13 Black",
    category: "Cámaras", categorySlug: "camaras",
    price: 9499, originalPrice: 10999, image: "📷", badge: "Oferta", rating: 5, reviews: 187, stock: 13,
    brand: "GoPro", sku: "GPR-H13B",
    img: GoProHero13,
    description: "La cámara de acción más versátil. Video 5.3K60 + HDR, foto de 27 MP, resistencia al agua hasta 10 m sin carcasa y nueva interfaz magnética HB Mount.",
    specs: [
      { label: "Video",        value: "5.3K60 / 4K120 / 2.7K240" },
      { label: "Foto",         value: "27 MP" },
      { label: "Estabilización",value: "HyperSmooth 6.0" },
      { label: "Resistencia",  value: "10 m sin carcasa" },
      { label: "Pantalla",     value: "2.27\" táctil trasera + 1.4\" frontal" },
      { label: "Batería",      value: "Enduro 1720 mAh" },
      { label: "Conectividad", value: "WiFi 6 + Bluetooth 5.0" },
      { label: "Montaje",      value: "HB Mount magnético" },
    ],
  },
  {
    id: 12, name: "Samsung Galaxy Tab S9 FE 128GB",
    category: "Tablets", categorySlug: "tablets",
    price: 8999, originalPrice: 9999, image: "📱", badge: "Oferta", rating: 4, reviews: 112, stock: 25,
    brand: "Samsung", sku: "SAM-TABS9FE-128",
    img: GalaxyTabS9,
    description: "Tablet Android con pantalla TFT de 10.9\", S Pen incluido, IP68 y batería de 10.090 mAh con autonomía de todo el día.",
    specs: [
      { label: "Pantalla",       value: "10.9\" TFT 2304×1440 90Hz" },
      { label: "Procesador",     value: "Exynos 1380" },
      { label: "RAM",            value: "6 GB" },
      { label: "Almacenamiento", value: "128 GB + microSD" },
      { label: "Batería",        value: "10.090 mAh, carga 45W" },
      { label: "S Pen",          value: "Incluido" },
      { label: "Resistencia",    value: "IP68" },
      { label: "Sistema",        value: "Android 13 / One UI 5.1" },
    ],
  },
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

export function getProductsByCategory(slug) {
  return PRODUCTS.filter(p => p.categorySlug === slug);
}
