import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";

const Promo = () => {
	const listPromo = [
		{
			name: "Pipa PVC 1 inch",
			description: "Diskon 20% untuk pembelian pipa PVC ukuran 1 inch.",
			image: "/path/to/pipa-pvc-1inch.jpg",
			validUntil: "30 Juni 2024"
		},
		{
			name: "Knee PVC 3/4 inch",
			description: "Beli 2 gratis 1 untuk knee PVC ukuran 3/4 inch.",
			image: "/path/to/knee-pvc-34inch.jpg",
			validUntil: "15 Juli 2024"
		},
		{
			name: "Keran Tembaga",
			description: "Diskon 15% untuk semua jenis keran tembaga.",
			image: "/path/to/keran-tembaga.jpg",
			validUntil: "10 Agustus 2024"
		},
		{
			name: "Sambungan Pipa Besi",
			description: "Diskon 10% untuk sambungan pipa besi.",
			image: "/path/to/sambungan-pipa-besi.jpg",
			validUntil: "20 Juni 2024"
		},
		{
			name: "Pipa HDPE 2 inch",
			description: "Diskon 25% untuk pembelian pipa HDPE ukuran 2 inch.",
			image: "/path/to/pipa-hdpe-2inch.jpg",
			validUntil: "25 Juli 2024"
		},
		{
			name: "Fitting Pipa Tembaga",
			description: "Beli 5 gratis 1 untuk fitting pipa tembaga.",
			image: "/path/to/fitting-pipa-tembaga.jpg",
			validUntil: "5 Agustus 2024"
		},
		{
			name: "Selang Fleksibel",
			description: "Diskon 30% untuk semua selang fleksibel.",
			image: "/path/to/selang-fleksibel.jpg",
			validUntil: "1 Juli 2024"
		},
		{
			name: "Valve Kuningan",
			description: "Diskon 20% untuk semua jenis valve kuningan.",
			image: "/path/to/valve-kuningan.jpg",
			validUntil: "12 Juli 2024"
		},
		{
			name: "Pompa Air Otomatis",
			description: "Diskon 10% untuk pompa air otomatis.",
			image: "/path/to/pompa-air-otomatis.jpg",
			validUntil: "30 Juni 2024"
		},
		{
			name: "Bak Kontrol",
			description: "Diskon 15% untuk pembelian bak kontrol.",
			image: "/path/to/bak-kontrol.jpg",
			validUntil: "18 Agustus 2024"
		},
		{
			name: "Filter Air",
			description: "Diskon 20% untuk semua jenis filter air.",
			image: "/path/to/filter-air.jpg",
			validUntil: "22 Juni 2024"
		},
		{
			name: "Shower Set",
			description: "Diskon 25% untuk pembelian shower set.",
			image: "/path/to/shower-set.jpg",
			validUntil: "10 Juli 2024"
		},
		{
			name: "Klem Pipa",
			description: "Beli 10 gratis 2 untuk klem pipa.",
			image: "/path/to/klem-pipa.jpg",
			validUntil: "30 Agustus 2024"
		},
		{
			name: "Gasket Karet",
			description: "Diskon 15% untuk pembelian gasket karet.",
			image: "/path/to/gasket-karet.jpg",
			validUntil: "5 Juli 2024"
		},
		{
			name: "Isolasi Pipa",
			description: "Diskon 20% untuk pembelian isolasi pipa.",
			image: "/path/to/isolasi-pipa.jpg",
			validUntil: "12 Agustus 2024"
		},
		{
			name: "Saringan Air",
			description: "Diskon 10% untuk semua jenis saringan air.",
			image: "/path/to/saringan-air.jpg",
			validUntil: "25 Juni 2024"
		},
		{
			name: "Pipa Galvanis 3 inch",
			description: "Diskon 25% untuk pipa galvanis ukuran 3 inch.",
			image: "/path/to/pipa-galvanis-3inch.jpg",
			validUntil: "10 Agustus 2024"
		},
		{
			name: "Soket Pipa PVC",
			description: "Diskon 15% untuk semua soket pipa PVC.",
			image: "/path/to/soket-pipa-pvc.jpg",
			validUntil: "1 Juli 2024"
		},
		{
			name: "Tee Pipa Besi",
			description: "Beli 3 gratis 1 untuk tee pipa besi.",
			image: "/path/to/tee-pipa-besi.jpg",
			validUntil: "5 Agustus 2024"
		},
		{
			name: "Water Heater Gas",
			description: "Diskon 20% untuk pembelian water heater gas.",
			image: "/path/to/water-heater-gas.jpg",
			validUntil: "15 Juli 2024"
		}
	];
	

	return (
		<div className='w-full h-screen flex bg-white'>
			<Sidebar />
			<div className='w-full overflow-y-auto'>
				<div className='w-full p-4'>
					<div className='w-full h-20 bg-blue-100 border border-blue-400 rounded p-2 mb-4'>
						<p className="text-blue-500 font-bold text-lg">POIN PASTI ANDA : <span className="text-blue-700 font-semibold">100</span></p>
						<p>
							Poin anda akan digunakan untuk promo yang berlaku secara otomatis saat melakukan pemesanan.
						</p>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{listPromo.map((promo, index) => (
							<div key={index} className='border border-gray-300 rounded-lg p-4 bg-white shadow'>
								<img src={promo.image} alt={promo.name} className='w-full h-32 object-cover rounded-t-lg' />
								<div className='mt-4'>
									<h3 className='text-lg font-semibold'>{promo.name}</h3>
									<p className='text-gray-700'>{promo.description}</p>
									<p className='text-gray-500 text-sm'>Berlaku hingga: {promo.validUntil}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Promo;
