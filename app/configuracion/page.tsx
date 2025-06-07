import { getUserPreferences, updateUserPreferences } from "@/lib/user-preferences"
import { auth } from "@clerk/nextjs"

async function ConfigurationPage() {
  const { userId } = auth()

  if (!userId) {
    return <div>Not authenticated</div>
  }

  const preferences = await getUserPreferences(userId)

  async function handleUpdatePreferences(formData: FormData) {
    "use server"

    const newTheme = formData.get("theme") as string
    if (newTheme) {
      await updateUserPreferences(userId, { theme: newTheme })
      // Optionally revalidate the cache to reflect changes immediately
      // revalidatePath('/configuracion');
    }
  }

  return (
    <div>
      <h1>Configuration</h1>
      <form action={handleUpdatePreferences}>
        <label htmlFor="theme">Theme:</label>
        <select id="theme" name="theme" defaultValue={preferences?.theme || "light"}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
        <button type="submit">Update Preferences</button>
      </form>
      <p>Current Theme: {preferences?.theme || "light"}</p>
    </div>
  )
}

export default ConfigurationPage
