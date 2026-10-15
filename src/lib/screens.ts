/**
 * Captures of the real application (demo data, light theme), taken with Playwright from the
 * local app: French captures for the French pages, the same views with the application switched
 * to English (`*-en.jpg`) for the English pages. Retake them when the application's screens change.
 */
import type { StaticImageData } from 'next/image'
import type { Lang } from '@/i18n/config'

import calendrier from '../../public/screens/calendrier.jpg'
import compteFactures from '../../public/screens/compte-factures.jpg'
import finances from '../../public/screens/finances.jpg'
import incidents from '../../public/screens/incidents.jpg'
import instructionCours from '../../public/screens/instruction-cours.jpg'
import maintenance from '../../public/screens/maintenance.jpg'
import mobileCalendrier from '../../public/screens/mobile-calendrier.jpg'
import mobileCompte from '../../public/screens/mobile-compte.jpg'
import mobilePlanDeVol from '../../public/screens/mobile-plan-de-vol.jpg'
import mobileTableauDeBord from '../../public/screens/mobile-tableau-de-bord.jpg'
import planDeVol from '../../public/screens/plan-de-vol.jpg'
import planDeVolNavigation from '../../public/screens/plan-de-vol-navigation.jpg'
import reservationPrix from '../../public/screens/reservation-prix.jpg'
import tableauDeBord from '../../public/screens/tableau-de-bord.jpg'
import calendrierEn from '../../public/screens/calendrier-en.jpg'
import compteFacturesEn from '../../public/screens/compte-factures-en.jpg'
import financesEn from '../../public/screens/finances-en.jpg'
import incidentsEn from '../../public/screens/incidents-en.jpg'
import instructionCoursEn from '../../public/screens/instruction-cours-en.jpg'
import maintenanceEn from '../../public/screens/maintenance-en.jpg'
import mobileCalendrierEn from '../../public/screens/mobile-calendrier-en.jpg'
import mobileCompteEn from '../../public/screens/mobile-compte-en.jpg'
import mobilePlanDeVolEn from '../../public/screens/mobile-plan-de-vol-en.jpg'
import mobileTableauDeBordEn from '../../public/screens/mobile-tableau-de-bord-en.jpg'
import planDeVolEn from '../../public/screens/plan-de-vol-en.jpg'
import planDeVolNavigationEn from '../../public/screens/plan-de-vol-navigation-en.jpg'
import reservationPrixEn from '../../public/screens/reservation-prix-en.jpg'
import tableauDeBordEn from '../../public/screens/tableau-de-bord-en.jpg'

const FR = {
  calendrier,
  compteFactures,
  finances,
  incidents,
  instructionCours,
  maintenance,
  mobileCalendrier,
  mobileCompte,
  mobilePlanDeVol,
  mobileTableauDeBord,
  planDeVol,
  planDeVolNavigation,
  reservationPrix,
  tableauDeBord,
}

export type ScreenName = keyof typeof FR

const EN: Record<ScreenName, StaticImageData> = {
  calendrier: calendrierEn,
  compteFactures: compteFacturesEn,
  finances: financesEn,
  incidents: incidentsEn,
  instructionCours: instructionCoursEn,
  maintenance: maintenanceEn,
  mobileCalendrier: mobileCalendrierEn,
  mobileCompte: mobileCompteEn,
  mobilePlanDeVol: mobilePlanDeVolEn,
  mobileTableauDeBord: mobileTableauDeBordEn,
  planDeVol: planDeVolEn,
  planDeVolNavigation: planDeVolNavigationEn,
  reservationPrix: reservationPrixEn,
  tableauDeBord: tableauDeBordEn,
}

/** The captures in the language of the page. */
export function screensFor(lang: Lang): Record<ScreenName, StaticImageData> {
  return lang === 'en' ? EN : FR
}
