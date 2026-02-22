import { Transmission } from '@/types/transmission'

const STORAGE_KEY = 'spaceFeedback'

export function loadTransmissions(): Transmission[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveTransmission(transmission: Omit<Transmission, 'id'>): Transmission {
  if (typeof window === 'undefined') {
    throw new Error('Cannot save transmission on server side')
  }

  const newTransmission: Transmission = {
    ...transmission,
    id: Date.now().toString(),
  }

  try {
    const existing = loadTransmissions()
    const updated = [...existing, newTransmission]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newTransmission
  } catch {
    throw new Error('Failed to save transmission to localStorage')
  }
}

export function deleteTransmission(id: string): void {
  if (typeof window === 'undefined') {
    throw new Error('Cannot delete transmission on server side')
  }

  try {
    const existing = loadTransmissions()
    const updated = existing.filter((t) => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    throw new Error('Failed to delete transmission from localStorage')
  }
}

export function clearAllTransmissions(): void {
  if (typeof window === 'undefined') {
    throw new Error('Cannot clear transmissions on server side')
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    throw new Error('Failed to clear transmissions from localStorage')
  }
}
