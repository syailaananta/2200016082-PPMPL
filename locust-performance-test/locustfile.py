from locust import HttpUser, task, between, SequentialTaskSet

class UserBehavior(SequentialTaskSet):
    
    @task
    def get_all_users(self):
        # GET request untuk mendapatkan semua pengguna
        self.client.get("/users")
    
    @task
    def create_user(self):
        # POST request untuk membuat pengguna baru
        self.client.post("/users", json={
            "name": "John Doe",
            "username": "johndoe",
            "email": "johndoe@example.com"
        })
    
    @task
    def get_user_by_id(self):
        # GET request untuk mendapatkan detail pengguna berdasarkan ID
        user_id = 1  # Contoh user ID
        self.client.get(f"/users/{user_id}")
    
    @task
    def update_user(self):
        # PUT request untuk memperbarui detail pengguna
        user_id = 1  # Contoh user ID
        self.client.put(f"/users/{user_id}", json={
            "name": "Jane Doe",
            "username": "janedoe",
            "email": "janedoe@example.com"
        })
    
    @task
    def delete_user(self):
        # DELETE request untuk menghapus pengguna
        user_id = 1  # Contoh user ID
        self.client.delete(f"/users/{user_id}")
        # Setelah DELETE, berhenti agar urutan diulang dari awal
        self.interrupt()

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)  # Tunggu antara 1 hingga 5 detik sebelum request selanjutnya
    tasks = [UserBehavior]
