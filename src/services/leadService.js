import api from './api'

export async function submitContactLead(payload) {
  const { data } = await api.post('/api/leads', { ...payload, source: 'contact_us' })
  return data
}

export async function submitGetStartedLead(payload) {
  const { data } = await api.post('/api/leads', { ...payload, source: 'get_started' })
  return data
}