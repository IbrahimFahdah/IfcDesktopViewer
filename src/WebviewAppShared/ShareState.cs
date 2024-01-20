using System.ComponentModel;

namespace WebviewAppShared
{
    public class ShareState : INotifyPropertyChanged
    {

        public void ShowFileDialog()
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(ShowFileDialog)));
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
